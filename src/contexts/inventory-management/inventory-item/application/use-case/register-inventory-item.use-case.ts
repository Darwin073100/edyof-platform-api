import { ProductCheckerPort } from "src/contexts/product-management/product/domain/ports/out/product-checker.port";
import { InventoryItemRepository } from "../../domain/repositories/inventory-item.repository";
import { InventoryRegisterDto } from "../dtos/inventory-register.dto";
import { BranchOfficeCheckerPort } from "src/contexts/establishment-management/branch-office/domain/ports/out/branch-office-checker.port";
import { LotCheckerPort } from "src/contexts/purchase-management/lot/domain/ports/out/lot-checker.port";
import { InventoryItemEntity } from "../../domain/entities/inventory-item.entity";
import { InventoryItemQuantityOnHandVO } from "../../domain/value-objects/inventory-item-quantity-on-hand.vo";
import { InventoryItemPurchasePriceAtStockVO } from "../../domain/value-objects/inventory-item-purchase-price-at-stock.vo";
import { InventoryItemInternalBarCodeVO } from "../../domain/value-objects/inventory-item-internal-bar-code.vo";
import { InventoryItemSalePriceOneVO } from "../../domain/value-objects/inventory-item-sale-price-one.vo";
import { InventoryItemSalePriceManyVO } from "../../domain/value-objects/inventory-item-sale-price-many.vo";
import { InventoryItemMinStockBranchVO } from "../../domain/value-objects/inventory-item-min-stock-branch.vo";
import { InventoryItemMaxStockBranchVO } from "../../domain/value-objects/inventory-item-max-stock-branch.vo";
import { InventoryItemNotFoundException } from "../../domain/exceptions/inventory-item-not-found.exception";
import { InventoryItemSaleQuantityManyVO } from "../../domain/value-objects/inventory-item-sale-quantity-many.vo";
import { InventoryItemSalePriceSpecialVO } from "../../domain/value-objects/inventory-item-sale-price-special.vo";

export class RegisterInventoryItemUseCase{
    constructor(
        private readonly inventoryItemRepository: InventoryItemRepository,
        private readonly productCheckerPort: ProductCheckerPort,
        private readonly lotCheckerPort: LotCheckerPort,
        private readonly branchOfficeCheckerPort: BranchOfficeCheckerPort
    ){

    }

    async execute(dto: InventoryRegisterDto){
        // 1. Verificar si el producto existe
        const productExists = await this.productCheckerPort.check(dto.productId);
        if(!productExists){
            throw new InventoryItemNotFoundException('El producto establecido no existe.');
        }
        // 2. Verificar si el lote existe
        const lotExists = await this.lotCheckerPort.exists(dto.lotId);
        if(!lotExists){
            throw new InventoryItemNotFoundException('El lote establecido no existe.');
        }
        // 3. Verificar que el producto sea del lote espesificado
        const isMatchLotAndProduct = await this.lotCheckerPort.matchLotAndProduct(dto.lotId, dto.productId);
        if(!isMatchLotAndProduct){
            throw new InventoryItemNotFoundException('Verifica que el lote sea del producto establecido o que el producto sea del lote.');
        }
        // 4. Verificar si la sucursal existe
        const branchOfficeExists = await this.branchOfficeCheckerPort.exists(dto.branchOfficeId);
        if(!branchOfficeExists){
            throw new InventoryItemNotFoundException('La sucursal establecida no existe.');
        }

        // 5. PASAR LOS DATOS DEL DTO A LA ENTIDAD DE DOMINIO
        const inventoryItem = InventoryItemEntity.create(
            dto.productId,
            dto.lotId,
            dto.branchOfficeId,
            dto.location,
            InventoryItemQuantityOnHandVO.create(dto.quantityOnHan),
            dto.lastStockedAt,
            dto.isSellable,
            InventoryItemPurchasePriceAtStockVO.create(dto.purchasePriceAtStock),
            InventoryItemInternalBarCodeVO.create(dto.internalBarCode),
            InventoryItemSalePriceOneVO.create(dto.salePriceOne),
            InventoryItemSalePriceManyVO.create(dto.salePriceMany),
            InventoryItemSaleQuantityManyVO.create(dto.saleQuantityMany),
            InventoryItemSalePriceSpecialVO.create(dto.salePriceSpecial),
            InventoryItemMinStockBranchVO.create(dto.minStockBranch),
            InventoryItemMaxStockBranchVO.create(dto.maxStockBranch),
        );

        // 6. GUARDAR EN EL REPOSITORIO
        const savedInventoryItem = await this.inventoryItemRepository.save(inventoryItem);
        // 7. DEVOLVER LA ENTIDAD GUARDADA
        return savedInventoryItem;
    }
}