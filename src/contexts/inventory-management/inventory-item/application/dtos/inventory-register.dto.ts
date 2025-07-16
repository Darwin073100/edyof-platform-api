import { LocationEnum } from "../../domain/enums/location.enum";

export class InventoryRegisterDto {
    readonly productId            : bigint;
    readonly lotId                : bigint;
    readonly branchOfficeId       : bigint;
    readonly location             : LocationEnum;
    readonly quantityOnHan        : number;
    readonly lastStockedAt        : Date;
    readonly isSellable           : boolean;
    readonly purchasePriceAtStock : number;
    readonly internalBarCode?     : string | null;
    readonly salePriceOne?        : number | null;
    readonly salePriceMany?       : number | null;
    readonly minStockBranch?      : number | null;
    readonly maxStockBranch?      : number | null;

    constructor(
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        location             : LocationEnum,
        quantityOnHan        : number,
        lastStockedAt        : Date,
        isSellable           : boolean,
        purchasePriceAtStock : number,
        internalBarCode?     : string | null,
        salePriceOne?        : number | null,
        salePriceMany?       : number | null,
        minStockBranch?      : number | null,
        maxStockBranch?      : number | null
    ) {
        this.productId            = productId;
        this.lotId                = lotId;
        this.branchOfficeId       = branchOfficeId;
        this.location             = location;
        this.quantityOnHan        = quantityOnHan;
        this.lastStockedAt        = lastStockedAt;
        this.isSellable           = isSellable;
        this.purchasePriceAtStock = purchasePriceAtStock;
        this.internalBarCode      = internalBarCode ?? null;
        this.salePriceOne         = salePriceOne ?? null;
        this.salePriceMany        = salePriceMany ?? null;
        this.minStockBranch       = minStockBranch ?? null;
        this.maxStockBranch       = maxStockBranch ?? null;
    }

}