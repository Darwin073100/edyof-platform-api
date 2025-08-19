import { BranchOfficeEntity } from "src/contexts/establishment-management/branch-office/domain/entities/branch-office.entity";
import { ProductEntity } from "src/contexts/product-management/product/domain/entities/product.entity";
import { LotEntity } from "src/contexts/purchase-management/lot/domain/entities/lot.entity";
import { InventorySalePriceOneVO } from "../value-objects/inventory-sale-price-one.vo";
import { InventorySalePriceManyVO } from "../value-objects/inventory-sale-price-many.vo";
import { InventoryMinStockBranchVO } from "../value-objects/inventory-min-stock-branch.vo";
import { InventoryMaxStockBranchVO } from "../value-objects/inventory-max-stock-branch.vo";
import { InventorySalePriceSpecialVO } from "../value-objects/inventory-sale-price-special.vo";
import { InventorySaleQuantityManyVO } from "../value-objects/inventory-sale-quantity-many.vo";
import { InventoryItemEntity } from "src/contexts/inventory-management/inventory-item/domain/entities/inventory-item.entity";

export class InventoryEntity{
    private readonly _inventoryId : bigint;
    private _productId                : bigint;
    private _lotId                    : bigint;
    private _branchOfficeId           : bigint;
    private _salePriceOne?            : InventorySalePriceOneVO | null;
    private _salePriceMany?           : InventorySalePriceManyVO | null;
    private _saleQuantityMany?        : InventorySaleQuantityManyVO | null;
    private _salePriceSpecial?        : InventorySalePriceSpecialVO | null;
    private _minStockBranch?          : InventoryMinStockBranchVO | null;
    private _maxStockBranch?          : InventoryMaxStockBranchVO | null;
    private _isSellable               : boolean;
    private _product?                 : ProductEntity | null;
    private _lot?                     : LotEntity | null;
    private _branchOffice?            : BranchOfficeEntity | null;
    private _inventoryItems?          : InventoryItemEntity[] | null;
    private readonly _createdAt       : Date;
    private _updatedAt?               : Date | null;
    private _deletedAt?               : Date | null;

    constructor(
        inventoryId      : bigint,
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        isSellable           : boolean,
        createdAt            : Date,
        salePriceOne?        : InventorySalePriceOneVO | null,
        salePriceMany?       : InventorySalePriceManyVO | null,
        saleQuantityMany? : InventorySaleQuantityManyVO | null,
        salePriceSpecial? : InventorySalePriceSpecialVO | null,
        minStockBranch?      : InventoryMinStockBranchVO | null,
        maxStockBranch?      : InventoryMaxStockBranchVO | null,
        product?             : ProductEntity | null,
        lot?                 : LotEntity | null,
        branchOffice?        : BranchOfficeEntity | null,
        inventoryItems?          : InventoryItemEntity[] | null,
        updatedAt?           : Date | null,
        deletedAt?           : Date | null,
    ){

        this._inventoryId      = inventoryId;
        this._productId        = productId;
        this._lotId            = lotId;
        this._branchOfficeId   = branchOfficeId;
        this._isSellable       = isSellable;
        this._createdAt        = createdAt;
        this._salePriceOne     = salePriceOne;
        this._salePriceMany    = salePriceMany;
        this._saleQuantityMany = saleQuantityMany;
        this._salePriceSpecial = salePriceSpecial;
        this._minStockBranch   = minStockBranch;
        this._maxStockBranch   = maxStockBranch;
        this._product          = product;
        this._lot              = lot;
        this._branchOffice     = branchOffice;
        this._inventoryItems   = inventoryItems;
        this._updatedAt        = updatedAt;
        this._deletedAt        = deletedAt;

    }
    get inventoryId(){
        return this._inventoryId;
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
    get inventoryItems(){
        return this._inventoryItems;
    }


    static create(
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        isSellable           : boolean,
        salePriceOne?        : InventorySalePriceOneVO | null,
        salePriceMany?       : InventorySalePriceManyVO | null,
        saleQuantityMany? : InventorySaleQuantityManyVO | null,
        salePriceSpecial? : InventorySalePriceSpecialVO | null,
        minStockBranch?      : InventoryMinStockBranchVO | null,
        maxStockBranch?      : InventoryMaxStockBranchVO | null,
    ){
        const inventory = new InventoryEntity(
            BigInt(new Date().getDate()),
            productId,
            lotId,
            branchOfficeId,
            isSellable,
            new Date(),
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
            null
        );
        return inventory; 
    }

    static reconstitute(
        inventoryItemId      : bigint,
        productId            : bigint,
        lotId                : bigint,
        branchOfficeId       : bigint,
        isSellable           : boolean,
        createdAt            : Date,
        salePriceOne?        : InventorySalePriceOneVO | null,
        salePriceMany?       : InventorySalePriceManyVO | null,
        saleQuantityMany? : InventorySaleQuantityManyVO | null,
        salePriceSpecial? : InventorySalePriceSpecialVO | null,
        minStockBranch?      : InventoryMinStockBranchVO | null,
        maxStockBranch?      : InventoryMaxStockBranchVO | null,
        product?             : ProductEntity | null,
        lot?                 : LotEntity | null,
        branchOffice?        : BranchOfficeEntity | null,
        inventoryItems?          : InventoryItemEntity[] | null,
        updatedAt?           : Date | null,
        deletedAt?           : Date | null,
    ){
        const inventory = new InventoryEntity(
            inventoryItemId,
            productId,
            lotId,
            branchOfficeId,
            isSellable,
            createdAt,
            salePriceOne,
            salePriceMany,
            saleQuantityMany,
            salePriceSpecial,
            minStockBranch,
            maxStockBranch,
            product,
            lot,
            branchOffice,
            inventoryItems,
            updatedAt,
            deletedAt,
        );
        return inventory;
    }
}