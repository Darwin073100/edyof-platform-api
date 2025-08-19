import { LocationEnum } from "../../domain/enums/location.enum";

export class InventoryItemRegisterDto {
    readonly inventoryId            : bigint;
    readonly location             : LocationEnum;
    readonly quantityOnHan        : number;
    readonly lastStockedAt        : Date;
    readonly purchasePriceAtStock : number;
    readonly internalBarCode?     : string | null;
    
    constructor(
        inventoryId            : bigint,
        location             : LocationEnum,
        quantityOnHan        : number,
        lastStockedAt        : Date,
        purchasePriceAtStock : number,
        internalBarCode?     : string | null,
    ) {
        this.inventoryId            = inventoryId;
        this.location             = location;
        this.quantityOnHan        = quantityOnHan;
        this.lastStockedAt        = lastStockedAt;
        this.purchasePriceAtStock = purchasePriceAtStock;
        this.internalBarCode      = internalBarCode ?? null;
    }

}