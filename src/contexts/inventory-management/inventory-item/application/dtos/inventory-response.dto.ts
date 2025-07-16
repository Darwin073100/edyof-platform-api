import { ProductResponseDto } from "src/contexts/product-management/product/application/dtos/product-response.dto";
import { LocationEnum } from "../../domain/enums/location.enum";
import { LotResponseDto } from "src/contexts/purchase-management/lot/application/dtos/lot-response.dto";

export class InventoryResponseDto {
    readonly inventoryItemId      : bigint;
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
    readonly createdAt            : Date;
    readonly updatedAt?           : Date|null;
    readonly deletedAt?           : Date|null;
    readonly product?             : ProductResponseDto|null;
    readonly lot?                 : LotResponseDto | null;

    constructor(
        inventoryItemId      : bigint,
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        location             : LocationEnum,
        quantityOnHan        : number,
        lastStockedAt        : Date,
        isSellable           : boolean,
        purchasePriceAtStock : number,
        createdAt            : Date,
        internalBarCode?     : string | null,
        salePriceOne?        : number | null,
        salePriceMany?       : number | null,
        minStockBranch?      : number | null,
        maxStockBranch?      : number | null,
        updatedAt?           : Date|null,
        deletedAt?           : Date|null,
        product?           : ProductResponseDto|null,
        lot?                 : LotResponseDto | null
    ) {
        this.inventoryItemId      = inventoryItemId;
        this.createdAt            = createdAt;
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
        this.updatedAt            = updatedAt ?? null;
        this.deletedAt            = deletedAt ?? null;
        this.product             = product ?? null;
        this.lot                 = lot ?? null;
    }

}