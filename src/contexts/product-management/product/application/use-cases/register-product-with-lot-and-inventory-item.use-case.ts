import { ProductEntity } from "src/contexts/product-management/product/domain/entities/product.entity";
import { InventoryItemEntity } from "../../../../inventory-management/inventory-item/domain/entities/inventory-item.entity";
import { InventoryItemInternalBarCodeVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-internal-bar-code.vo";
import { InventoryItemMaxStockBranchVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-max-stock-branch.vo";
import { InventoryItemMinStockBranchVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-min-stock-branch.vo";
import { InventoryItemPurchasePriceAtStockVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-purchase-price-at-stock.vo";
import { InventoryItemQuantityOnHandVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-quantity-on-hand.vo";
import { InventoryItemSalePriceManyVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-sale-price-many.vo";
import { InventoryItemSalePriceOneVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-sale-price-one.vo";
import { InventoryItemSalePriceSpecialVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-sale-price-special.vo";
import { InventoryItemSaleQuantityManyVO } from "../../../../inventory-management/inventory-item/domain/value-objects/inventory-item-sale-quantity-many.vo";
import { RegisterProductWhitLotAndInventoryDto } from "../dtos/register-product-with-lot-and-inventory.dto";
import { ProductNameVO } from "src/contexts/product-management/product/domain/value-objects/product-name.vo";
import { ProductSkuVO } from "src/contexts/product-management/product/domain/value-objects/product-sku.vo";
import { ProductUniversalBarCodeVO } from "src/contexts/product-management/product/domain/value-objects/product-universal-bar-code.vo";
import { ProductDescriptionVO } from "src/contexts/product-management/product/domain/value-objects/product-description.vo";
import { v4 as uuid } from 'uuid'
import { ForSaleEnum } from "src/contexts/product-management/product/domain/enums/for-sale.enum";
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
        const inventoryItemEntity = InventoryItemEntity.reconstitute(
            0n,
            BigInt(new Date().getDate()),
            BigInt(new Date().getDate()),
            dto.branchOfficeId,
            dto.location,
            InventoryItemQuantityOnHandVO.create(dto.quantityOnHan),
            dto.lastStockedAt,
            dto.isSellable,
            new Date(),
            InventoryItemPurchasePriceAtStockVO.create(dto.purchasePriceAtStock),
            InventoryItemInternalBarCodeVO.create(dto.internalBarCode),
            InventoryItemSalePriceOneVO.create(dto.salePriceOne),
            InventoryItemSalePriceManyVO.create(dto.salePriceMany),
            InventoryItemSaleQuantityManyVO.create(dto.saleQuantityMany),
            InventoryItemSalePriceSpecialVO.create(dto.salePriceSpecial),
            InventoryItemMinStockBranchVO.create(dto.minStockBranch),
            InventoryItemMaxStockBranchVO.create(dto.maxStockBranch),
            null, // Product
            null, // Lot
            null,
            null,
            null,
        );
        const lot = LotEntity.reconstitute(
            BigInt(new Date().getDate()),
            BigInt(new Date().getDate()),
            LotNumberVO.create(dto.lotNumber),
            PurchasePriceVO.create(dto.purchasePrice),
            InitialQuantityVO.create(dto.initialQuantity),
            ReceivedDateVO.create(dto.receivedDate),
            new Date(),
            ExpirationDateVO.create(dto.expirationDate),
            ManufacturingDateVO.create(dto.manufacturingDate),
            null,
            null,
            null,
            [inventoryItemEntity],
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
            null
        );
        const result = await this.productRepository.saveProductWithLotAdnInventoryItem(productEntity);
        return result;
    }
}