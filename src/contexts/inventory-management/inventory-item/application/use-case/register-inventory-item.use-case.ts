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
            throw new InventoryItemNotFoundException('El producto no existe.');
        }
        console.log(productExists);

        // 2. Verificar si la sucursal existe
        const branchOfficeExists = await this.branchOfficeCheckerPort.exists(dto.branchOfficeId);
        if(!branchOfficeExists){
            throw new InventoryItemNotFoundException('La sucursal no existe.');
        }
        console.log(branchOfficeExists)

        // 3. Verificar si el lote existe
        const lotExists = await this.lotCheckerPort.exists(dto.lotId);
        if(!lotExists){
            throw new InventoryItemNotFoundException('El lote no existe.');
        }
        console.log(lotExists)

        // 4. PASAR LOS DATOS DEL DTO A LA ENTIDAD DE DOMINIO
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
            InventoryItemMinStockBranchVO.create(dto.minStockBranch),
            InventoryItemMaxStockBranchVO.create(dto.maxStockBranch),
        );

        // 5. GUARDAR EN EL REPOSITORIO
        const savedInventoryItem = await this.inventoryItemRepository.save(inventoryItem);
        // 6. DEVOLVER LA ENTIDAD GUARDADA
        return savedInventoryItem;
    }
}