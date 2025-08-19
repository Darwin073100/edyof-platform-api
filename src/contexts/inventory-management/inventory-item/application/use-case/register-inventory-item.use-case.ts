import { InventoryItemRepository } from "../../domain/repositories/inventory-item.repository";
import { InventoryItemRegisterDto } from "../dtos/inventory-item-register.dto";
import { InventoryItemEntity } from "../../domain/entities/inventory-item.entity";
import { InventoryItemQuantityOnHandVO } from "../../domain/value-objects/inventory-item-quantity-on-hand.vo";
import { InventoryItemPurchasePriceAtStockVO } from "../../domain/value-objects/inventory-item-purchase-price-at-stock.vo";
import { InventoryItemInternalBarCodeVO } from "../../domain/value-objects/inventory-item-internal-bar-code.vo";
import { InventoryItemNotFoundException } from "../../domain/exceptions/inventory-item-not-found.exception";
import { InventoryCheckerPort } from "src/contexts/inventory-management/inventory/domain/port/out/inventory-ckecker.port";

export class RegisterInventoryItemUseCase{
    constructor(
        private readonly inventoryItemRepository: InventoryItemRepository,
        private readonly inventoryCheckerPort: InventoryCheckerPort,
    ){

    }

    async execute(dto: InventoryItemRegisterDto){
        // Verificar si el inventario existe
        const inventoryExists = await this.inventoryCheckerPort.exist(dto.inventoryId);
        if(!inventoryExists){
            throw new InventoryItemNotFoundException('El inventario establecido no existe.');
        }
        

        // PASAR LOS DATOS DEL DTO A LA ENTIDAD DE DOMINIO
        const inventoryItem = InventoryItemEntity.create(
            dto.inventoryId,
            dto.location,
            InventoryItemQuantityOnHandVO.create(dto.quantityOnHan),
            dto.lastStockedAt,
            InventoryItemPurchasePriceAtStockVO.create(dto.purchasePriceAtStock),
            InventoryItemInternalBarCodeVO.create(dto.internalBarCode),
        );

        // GUARDAR EN EL REPOSITORIO
        const savedInventoryItem = await this.inventoryItemRepository.save(inventoryItem);
        // DEVOLVER LA ENTIDAD GUARDADA
        return savedInventoryItem;
    }
}