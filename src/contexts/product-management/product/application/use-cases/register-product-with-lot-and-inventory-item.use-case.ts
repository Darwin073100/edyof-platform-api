import { ProductEntity } from "src/contexts/product-management/product/domain/entities/product.entity";
import { InventoryEntity } from "../../../../inventory-management/inventory/domain/entities/inventory.entity";
import { InventoryMaxStockBranchVO } from "../../../../inventory-management/inventory/domain/value-objects/inventory-max-stock-branch.vo";
import { InventoryMinStockBranchVO } from "../../../../inventory-management/inventory/domain/value-objects/inventory-min-stock-branch.vo";
import { InventorySalePriceManyVO } from "../../../../inventory-management/inventory/domain/value-objects/inventory-sale-price-many.vo";
import { InventorySalePriceOneVO } from "../../../../inventory-management/inventory/domain/value-objects/inventory-sale-price-one.vo";
import { InventorySalePriceSpecialVO } from "../../../../inventory-management/inventory/domain/value-objects/inventory-sale-price-special.vo";
import { InventorySaleQuantityManyVO } from "../../../../inventory-management/inventory/domain/value-objects/inventory-sale-quantity-many.vo";
import { RegisterProductWhitLotAndInventoryDto } from "../dtos/register-product-with-lot-and-inventory.dto";
import { ProductNameVO } from "src/contexts/product-management/product/domain/value-objects/product-name.vo";
import { ProductSkuVO } from "src/contexts/product-management/product/domain/value-objects/product-sku.vo";
import { ProductUniversalBarCodeVO } from "src/contexts/product-management/product/domain/value-objects/product-universal-bar-code.vo";
import { ProductDescriptionVO } from "src/contexts/product-management/product/domain/value-objects/product-description.vo";
import { v4 as uuid } from 'uuid'
import { ForSaleEnum } from "src/shared/domain/enums/for-sale.enum";
import { LotEntity } from "src/contexts/purchase-management/lot/domain/entities/lot.entity";
import { LotNumberVO } from "src/contexts/purchase-management/lot/domain/value-objects/lot-number.vo";
import { PurchasePriceVO } from "src/contexts/purchase-management/lot/domain/value-objects/purchase-price.vo";
import { InitialQuantityVO } from "src/contexts/purchase-management/lot/domain/value-objects/initial-quantity.vo";
import { ReceivedDateVO } from "src/contexts/purchase-management/lot/domain/value-objects/received-date.vo";
import { ExpirationDateVO } from "src/contexts/purchase-management/lot/domain/value-objects/expiration-date.vo";
import { ManufacturingDateVO } from "src/contexts/purchase-management/lot/domain/value-objects/manufacturing-date.vo";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductNotFoundException } from "../../domain/exceptions/product-not-found.exception";
import { ProductAlreadyExistsException } from "../../domain/exceptions/product-already-exists.exception";
import { CategoryCheckerPort } from "src/contexts/product-management/category/domain/ports/out/category-checker.port";
import { BrandChekerPort } from "src/contexts/product-management/brand/domain/ports/out/brand-checker.port";
import { SeasonCheckerPort } from "src/contexts/product-management/season/domain/ports/out/season-checker.port";
import { EstablishmentCheckerPort } from "src/contexts/establishment-management/establishment/application/ports/out/establishment-checker.port";
import { LotUnitPurchaseEntity } from "src/contexts/purchase-management/lot/domain/entities/lot-unit-purchase.entity";
import { LotPurchaseQuantityVO } from "src/contexts/purchase-management/lot/domain/value-objects/lot-purchase-quantity.vo";
import { LotUnitsInPurchaseUnitVO } from "src/contexts/purchase-management/lot/domain/value-objects/lot-units-in-purchase-unit.vo";
import { InventoryItemEntity } from "src/contexts/inventory-management/inventory-item/domain/entities/inventory-item.entity";
import { InventoryItemQuantityOnHandVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-quantity-on-hand.vo";
import { InventoryItemPurchasePriceAtStockVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-purchase-price-at-stock.vo";
import { InventoryItemInternalBarCodeVO } from "src/contexts/inventory-management/inventory-item/domain/value-objects/inventory-item-internal-bar-code.vo";

export class RegisterProductWithLotAndInventoryItemUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryChecker: CategoryCheckerPort,
        private readonly brandChecker: BrandChekerPort,
        private readonly seasonChecker: SeasonCheckerPort,
        private readonly establishmentChecker: EstablishmentCheckerPort, 
    ) { }

    async execute(dto: RegisterProductWhitLotAndInventoryDto) {
        // Validar unicidad SKU
        if (dto.sku) {
            const existingBySku = await this.productRepository.findByEstablishmentAndSku(dto.establishmentId, dto.sku);
            if (existingBySku) {
                throw ProductAlreadyExistsException.forSku(dto.establishmentId, dto.sku);
            }
        }
        // Validar unicidad universalBarCode
        if (dto.universalBarCode) {
            const existingByBarCode = await this.productRepository.findByEstablishmentAndUniversalBarCode(dto.establishmentId, dto.universalBarCode);
            if (existingByBarCode) {
                throw ProductAlreadyExistsException.forUniversalBarCode(dto.establishmentId, dto.universalBarCode);
            }
        }

        if (dto.brandId) {
            // Validar existencia de la marca
            const brandExists = await this.brandChecker.exists(dto.brandId);
            if (!brandExists) {
                throw new ProductNotFoundException(`La marca a la que deseas asignar el producto no existe.`);
            }
        }

        if (dto.seasonId) {
            // Validar existencia de la temporada
            const seasonExists = await this.seasonChecker.exists(dto.seasonId);
            // ...removed console.log...
            if (!seasonExists) {
                throw new ProductNotFoundException(`La temporada a la que deseas asignar el producto no existe.`);
            }
        }

        if (dto.establishmentId) {
            const establishmentExists = await this.establishmentChecker.exists(dto.establishmentId);
            if (!establishmentExists) {
                throw new ProductNotFoundException(`El establecimiento al que deseas asignar el producto no existe.`);
            }
        }

        if (dto.categoryId) {
            const categoryExists = await this.categoryChecker.exists(dto.categoryId);
            if (!categoryExists) {
                throw new ProductNotFoundException(`La categoría a la que deseas asignar el producto no existe.`);
            }
        }

        const inventoryEntity = InventoryEntity.reconstitute(
            0n,
            BigInt(new Date().getDate()),
            BigInt(new Date().getDate()),
            dto.branchOfficeId,
            dto.isSellable,
            new Date(),
            InventorySalePriceOneVO.create(dto.salePriceOne),
            InventorySalePriceManyVO.create(dto.salePriceMany),
            InventorySaleQuantityManyVO.create(dto.saleQuantityMany),
            InventorySalePriceSpecialVO.create(dto.salePriceSpecial),
            InventoryMinStockBranchVO.create(dto.minStockBranch),
            InventoryMaxStockBranchVO.create(dto.maxStockBranch),
            null, // Product
            null, // Lot
            null,
            dto.inventoryItems?.map(item=>{
                return InventoryItemEntity.reconstitute(
                    BigInt(new Date().getTime()),
                    BigInt(new Date().getTime()),
                    item.location,
                    InventoryItemQuantityOnHandVO.create(item.quantityOnHan),
                    item.lastStockedAt,
                    new Date(),
                    InventoryItemPurchasePriceAtStockVO.create(item.purchasePriceAtStock),
                    InventoryItemInternalBarCodeVO.create(item.internalBarCode),
                    null,
                    null,
                    null
                )
            }),
            null,
            null
        );
        const lot = LotEntity.reconstitute(
            BigInt(new Date().getDate()),
            BigInt(new Date().getDate()),
            LotNumberVO.create(dto.lotNumber),
            PurchasePriceVO.create(dto.purchasePrice),
            InitialQuantityVO.create(dto.initialQuantity),
            dto.purchaseUnit,
            ReceivedDateVO.create(dto.receivedDate),
            new Date(),
            ExpirationDateVO.create(dto.expirationDate),
            ManufacturingDateVO.create(dto.manufacturingDate),
            null,
            null,
            null,
            [inventoryEntity],
            dto.lotUnitPurchases?.map(item => {
                return LotUnitPurchaseEntity.create(
                    item.lotId ?? BigInt(0),
                    PurchasePriceVO.create(item.purchasePrice),
                    LotPurchaseQuantityVO.create(item.purchasePrice),
                    item.unit,
                    LotUnitsInPurchaseUnitVO.create(item.unitsInPurchaseUnit)
                )
            })
        );
        const productEntity = ProductEntity.reconstitute(
            BigInt(new Date().getDate()),
            dto.establishmentId,
            dto.categoryId,
            dto.brandId ?? null,
            dto.seasonId ?? null,
            new ProductNameVO(dto.name),
            new ProductSkuVO(uuid()),
            new ProductUniversalBarCodeVO(dto.universalBarCode ?? null),
            new ProductDescriptionVO(dto.description ?? null),
            dto.unitOfMeasure as ForSaleEnum,
            dto.minStockGlobal,
            dto.imageUrl ?? null,
            new Date(),
            null,
            null,
            null,
            null,
            null,
            null,
            [lot],
            [inventoryEntity]
        );
        console.log(productEntity.inventories);
        const result = await this.productRepository.saveProductWithLotAdnInventoryItem(productEntity);
        return result;
    }
}