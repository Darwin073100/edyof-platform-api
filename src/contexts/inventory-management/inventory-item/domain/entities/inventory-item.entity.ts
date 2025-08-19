import { InventoryItemInternalBarCodeVO } from "../value-objects/inventory-item-internal-bar-code.vo";
import { InventoryItemPurchasePriceAtStockVO } from "../value-objects/inventory-item-purchase-price-at-stock.vo";
import { LocationEnum } from "../enums/location.enum";
import { InventoryItemQuantityOnHandVO } from "../value-objects/inventory-item-quantity-on-hand.vo";
import { InventoryEntity } from "src/contexts/inventory-management/inventory/domain/entities/inventory.entity";

export class InventoryItemEntity{
    private readonly _inventoryItemId : bigint;
    private _inventoryId              : bigint;
    private _location                 : LocationEnum;
    private _internalBarCode?         : InventoryItemInternalBarCodeVO | null;
    private _quantityOnHand           : InventoryItemQuantityOnHandVO;
    private _purchasePriceAtStock     : InventoryItemPurchasePriceAtStockVO;
    private _lastStockedAt            : Date;
    private readonly _createdAt       : Date;
    private _inventory?               : InventoryEntity | null;
    private _updatedAt?               : Date | null;
    private _deletedAt?               : Date | null;

    constructor(
        inventoryItemId      : bigint,
        inventoryId            : bigint,
        location             : LocationEnum,
        quantityOnHan        : InventoryItemQuantityOnHandVO,
        lastStockedAt        : Date,
        createdAt            : Date,
        purchasePriceAtStock : InventoryItemPurchasePriceAtStockVO,
        internalBarCode?     : InventoryItemInternalBarCodeVO | null,
        inventory?           : InventoryEntity | null,
        updatedAt?           : Date | null,
        deletedAt?           : Date | null,
    ){

        this._inventoryItemId      = inventoryItemId;
        this._inventoryId          = inventoryId;
        this._location             = location;
        this._quantityOnHand        = quantityOnHan;
        this._lastStockedAt        = lastStockedAt;
        this._createdAt            = createdAt;
        this._purchasePriceAtStock = purchasePriceAtStock;
        this._internalBarCode      = internalBarCode;
        this._inventory            = inventory;
        this._updatedAt            = updatedAt;
        this._deletedAt            = deletedAt;

    }
    get inventoryItemId(){
        return this._inventoryItemId;
    }
    get inventoryId(){
        return this._inventoryId;
    }
    get location(){
        return this._location;
    }
    get internalBarCode(){
        return this._internalBarCode;
    }
    get quantityOnHand(){
        return this._quantityOnHand;
    }
    get purchasePriceAtStock(){
        return this._purchasePriceAtStock;
    }
    get lastStockedAt(){
        return this._lastStockedAt;
    }
    get createdAt(){
        return this._createdAt;
    }
    get updatedAt(){
        return this._updatedAt;
    }
    get deletedAt(){
        return this._deletedAt;
    }
    get inventory(){
        return this._inventory;
    }


    static create(
        inventoryId          : bigint,
        location             : LocationEnum,
        quantityOnHan        : InventoryItemQuantityOnHandVO,
        lastStockedAt        : Date,
        purchasePriceAtStock : InventoryItemPurchasePriceAtStockVO,
        internalBarCode?     : InventoryItemInternalBarCodeVO | null,
    ){
        const inventory = new InventoryItemEntity(
            BigInt(new Date().getDate()),
            inventoryId,
            location,
            quantityOnHan,
            lastStockedAt,
            new Date(),
            purchasePriceAtStock,
            internalBarCode,
            null,
            null,
            null,
        );
        return inventory; 
    }

    static reconstitute(
        inventoryItemId      : bigint,
        inventoryId            : bigint,
        location             : LocationEnum,
        quantityOnHan        : InventoryItemQuantityOnHandVO,
        lastStockedAt        : Date,
        createdAt            : Date,
        purchasePriceAtStock : InventoryItemPurchasePriceAtStockVO,
        internalBarCode?     : InventoryItemInternalBarCodeVO | null,
        inventory?: InventoryEntity|null, 
        updatedAt?           : Date | null,
        deletedAt?           : Date | null,
    ){
        const inventoryEntity = new InventoryItemEntity(
            inventoryItemId,
            inventoryId,
            location,
            quantityOnHan,
            lastStockedAt,
            createdAt,
            purchasePriceAtStock,
            internalBarCode,
            inventory,
            updatedAt,
            deletedAt,
        );
        return inventoryEntity;
    }
}