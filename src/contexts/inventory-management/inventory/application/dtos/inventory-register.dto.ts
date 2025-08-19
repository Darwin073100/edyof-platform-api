import { InventoryItemRegisterDto } from "src/contexts/inventory-management/inventory-item/application/dtos/inventory-item-register.dto";

export class InventoryRegisterDto {
    readonly productId            : bigint;
    readonly lotId                : bigint;
    readonly branchOfficeId       : bigint;
    readonly isSellable           : boolean;
    readonly salePriceOne?        : number | null;
    readonly salePriceMany?       : number | null;
    readonly saleQuantityMany?    : number | null;
    readonly salePriceSpecial?    : number | null;
    readonly minStockBranch?      : number | null;
    readonly maxStockBranch?      : number | null;
    readonly inventoryItems?: InventoryItemRegisterDto[] | null;

    constructor(
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        isSellable           : boolean,
        salePriceOne?        : number | null,
        salePriceMany?       : number | null,
        saleQuantityMany?    : number | null,
        salePriceSpecial?    : number | null,
        minStockBranch?      : number | null,
        maxStockBranch?      : number | null,
        inventoryItems?: InventoryItemRegisterDto[] | null
    ) {
        this.productId            = productId;
        this.lotId                = lotId;
        this.branchOfficeId       = branchOfficeId;
        this.isSellable           = isSellable;
        this.salePriceOne         = salePriceOne ?? null;
        this.salePriceMany        = salePriceMany ?? null;
        this.saleQuantityMany     = saleQuantityMany ?? null;
        this.salePriceSpecial     = salePriceSpecial ?? null;
        this.minStockBranch       = minStockBranch ?? null;
        this.maxStockBranch       = maxStockBranch ?? null;
        this.inventoryItems       = inventoryItems ?? null;
    }

}