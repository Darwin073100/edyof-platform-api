import { BranchOfficeEntity } from "src/contexts/establishment-management/branch-office/domain/entities/branch-office.entity";
import { ProductEntity } from "src/contexts/product-management/product/domain/entities/product.entity";
import { LotEntity } from "src/contexts/purchase-management/lot/domain/entities/lot.entity";
import { InventoryItemInternalBarCodeVO } from "../value-objects/inventory-item-internal-bar-code.vo";
import { InventoryItemPurchasePriceAtStockVO } from "../value-objects/inventory-item-purchase-price-at-stock.vo";
import { InventoryItemSalePriceOneVO } from "../value-objects/inventory-item-sale-price-one.vo";
import { InventoryItemSalePriceManyVO } from "../value-objects/inventory-item-sale-price-many.vo";
import { InventoryItemMinStockBranchVO } from "../value-objects/inventory-item-min-stock-branch.vo";
import { InventoryItemMaxStockBranchVO } from "../value-objects/inventory-item-max-stock-branch.vo";
import { LocationEnum } from "../enums/location.enum";
import { InventoryItemQuantityOnHandVO } from "../value-objects/inventory-item-quantity-on-hand.vo";
import { InventoryItemSalePriceSpecialVO } from "../value-objects/inventory-item-sale-price-special.vo";

export class InventoryItemEntity{
    private readonly _inventoryItemId : bigint;
    private _productId                : bigint;
    private _lotId                    : bigint;
    private _branchOfficeId           : bigint;
    private _location                 : LocationEnum;
    private _internalBarCode?         : InventoryItemInternalBarCodeVO | null;
    private _quantityOnHan            : InventoryItemQuantityOnHandVO;
    private _purchasePriceAtStock     : InventoryItemPurchasePriceAtStockVO;
    private _salePriceOne?            : InventoryItemSalePriceOneVO | null;
    private _salePriceMany?           : InventoryItemSalePriceManyVO | null;
    private _saleQuantityMany?        : InventoryItemSalePriceSpecialVO | null;
    private _salePriceSpecial?        : InventoryItemSalePriceSpecialVO | null;
    private _minStockBranch?          : InventoryItemMinStockBranchVO | null;
    private _maxStockBranch?          : InventoryItemMaxStockBranchVO | null;
    private _lastStockedAt            : Date;
    private _isSellable               : boolean;
    private _product?                 : ProductEntity | null;
    private _lot?                     : LotEntity | null;
    private _branchOffice?            : BranchOfficeEntity | null;
    private readonly _createdAt       : Date;
    private _updatedAt?               : Date | null;
    private _deletedAt?               : Date | null;

    constructor(
        inventoryItemId      : bigint,
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        location             : LocationEnum,
        quantityOnHan        : InventoryItemQuantityOnHandVO,
        lastStockedAt        : Date,
        isSellable           : boolean,
        createdAt            : Date,
        purchasePriceAtStock : InventoryItemPurchasePriceAtStockVO,
        internalBarCode?     : InventoryItemInternalBarCodeVO | null,
        salePriceOne?        : InventoryItemSalePriceOneVO | null,
        salePriceMany?       : InventoryItemSalePriceManyVO | null,
        saleQuantityMany? : InventoryItemSalePriceSpecialVO | null,
        salePriceSpecial? : InventoryItemSalePriceSpecialVO | null,
        minStockBranch?      : InventoryItemMinStockBranchVO | null,
        maxStockBranch?      : InventoryItemMaxStockBranchVO | null,
        product?             : ProductEntity | null,
        lot?                 : LotEntity | null,
        branchOffice?        : BranchOfficeEntity | null,
        updatedAt?           : Date | null,
        deletedAt?           : Date | null,
    ){

        this._inventoryItemId      = inventoryItemId;
        this._productId            = productId;
        this._lotId                = lotId;
        this._branchOfficeId       = branchOfficeId;
        this._location             = location;
        this._quantityOnHan        = quantityOnHan;
        this._lastStockedAt        = lastStockedAt;
        this._isSellable           = isSellable;
        this._createdAt            = createdAt;
        this._purchasePriceAtStock = purchasePriceAtStock;
        this._internalBarCode      = internalBarCode;
        this._salePriceOne         = salePriceOne;
        this._salePriceMany        = salePriceMany;
        this._saleQuantityMany     = saleQuantityMany;
        this._salePriceSpecial     = salePriceSpecial;
        this._minStockBranch       = minStockBranch;
        this._maxStockBranch       = maxStockBranch;
        this._product              = product;
        this._lot                  = lot;
        this._branchOffice         = branchOffice;
        this._updatedAt            = updatedAt;
        this._deletedAt            = deletedAt;

    }
    get inventoryItemId(){
        return this._inventoryItemId;
    }
    get productId(){
        return this._productId;
    }
    get lotId(){
        return this._lotId;
    }
    get branchOfficeId(){
        return this._branchOfficeId;
    }
    get location(){
        return this._location;
    }
    get internalBarCode(){
        return this._internalBarCode;
    }
    get quantityOnHand(){
        return this._quantityOnHan;
    }
    get purchasePriceAtStock(){
        return this._purchasePriceAtStock;
    }
    get salePriceOne(){
        return this._salePriceOne;
    }
    get salePriceMany(){
        return this._salePriceMany;
    }
    get saleQuantityMany(){
        return this._saleQuantityMany;
    }
    get salePriceSpecial(){
        return this._salePriceSpecial;
    }
    get minStockBranch(){
        return this._minStockBranch;
    }
    get maxStockBranch(){
        return this._maxStockBranch;
    }
    get lastStockedAt(){
        return this._lastStockedAt;
    }
    get isSellable(){
        return this._isSellable;
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
    get product(){
        return this._product;
    }
    get branchOffice(){
        return this._branchOffice;
    }
    get lot(){
        return this._lot;
    }


    static create(
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        location             : LocationEnum,
        quantityOnHan        : InventoryItemQuantityOnHandVO,
        lastStockedAt        : Date,
        isSellable           : boolean,
        purchasePriceAtStock : InventoryItemPurchasePriceAtStockVO,
        internalBarCode?     : InventoryItemInternalBarCodeVO | null,
        salePriceOne?        : InventoryItemSalePriceOneVO | null,
        salePriceMany?       : InventoryItemSalePriceManyVO | null,
        saleQuantityMany? : InventoryItemSalePriceSpecialVO | null,
        salePriceSpecial? : InventoryItemSalePriceSpecialVO | null,
        minStockBranch?      : InventoryItemMinStockBranchVO | null,
        maxStockBranch?      : InventoryItemMaxStockBranchVO | null,
    ){
        const inventory = new InventoryItemEntity(
            BigInt(new Date().getDate()),
            productId,
            lotId,
            branchOfficeId,
            location,
            quantityOnHan,
            lastStockedAt,
            isSellable,
            new Date(),
            purchasePriceAtStock,
            internalBarCode,
            salePriceOne,
            salePriceMany,
            saleQuantityMany,
            salePriceSpecial,
            minStockBranch,
            maxStockBranch,
            null,
            null,
            null,
            null,
            null,
        );
        return inventory; 
    }

    static reconstitute(
        inventoryItemId      : bigint,
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        location             : LocationEnum,
        quantityOnHan        : InventoryItemQuantityOnHandVO,
        lastStockedAt        : Date,
        isSellable           : boolean,
        createdAt            : Date,
        purchasePriceAtStock : InventoryItemPurchasePriceAtStockVO,
        internalBarCode?     : InventoryItemInternalBarCodeVO | null,
        salePriceOne?        : InventoryItemSalePriceOneVO | null,
        salePriceMany?       : InventoryItemSalePriceManyVO | null,
        saleQuantityMany? : InventoryItemSalePriceSpecialVO | null,
        salePriceSpecial? : InventoryItemSalePriceSpecialVO | null,
        minStockBranch?      : InventoryItemMinStockBranchVO | null,
        maxStockBranch?      : InventoryItemMaxStockBranchVO | null,
        product?             : ProductEntity | null,
        lot?                 : LotEntity | null,
        branchOffice?        : BranchOfficeEntity | null,
        updatedAt?           : Date | null,
        deletedAt?           : Date | null,
    ){
        const inventory = new InventoryItemEntity(
            inventoryItemId,
            productId,
            lotId,
            branchOfficeId,
            location,
            quantityOnHan,
            lastStockedAt,
            isSellable,
            createdAt,
            purchasePriceAtStock,
            internalBarCode,
            salePriceOne,
            salePriceMany,
            saleQuantityMany,
            salePriceSpecial,
            minStockBranch,
            maxStockBranch,
            product,
            lot,
            branchOffice,
            updatedAt,
            deletedAt,
        );
        return inventory;
    }
}