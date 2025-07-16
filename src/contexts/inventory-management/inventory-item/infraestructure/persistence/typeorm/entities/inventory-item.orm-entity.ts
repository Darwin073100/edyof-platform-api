import { BranchOfficeOrmEntity } from "src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity";
import { LocationEnum } from "src/contexts/inventory-management/inventory-item/domain/enums/location.enum";
import { ProductOrmEntity } from "src/contexts/product-management/product/infraestructure/persistence/typeorm/entities/product.orm-entity";
import { LotOrmEntity } from "src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/entities/lot.orm-entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('inventory_item')
export class InventoryItemOrmEntity{
    @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'inventory_item_id' })
    inventoryItemId      : bigint;
    @Column({name: 'product_id', type: 'bigint', nullable: false})
    productId            : bigint;
    @Column({name: 'lot_id', type: 'bigint', nullable: false})
    lotId                : bigint;
    @Column({name: 'branch_office_id', type: 'bigint', nullable: false})
    branchOfficeId       : bigint;
    @Column({ type: 'enum', enum: LocationEnum, name: 'location', nullable: true })
    location             : LocationEnum;
    @Column({type: 'varchar', length: 100, nullable: true})
    internalBarCode?     : string | null;
    @Column({type: 'decimal', precision: 18, scale: 3, nullable: false, name: 'quantity_on_hand', default: 0})
    quantityOnHan        : number;
    @Column({type: 'decimal', precision: 12, scale: 4, nullable: false, name: 'purchase_price_at_stock'})
    purchasePriceAtStock : number;
    @Column({type: 'decimal', precision: 12, scale: 2, nullable: true, name: 'sale_price_one'})
    salePriceOne?        : number | null;
    @Column({type: 'decimal', precision: 12, scale: 2, nullable: true, name: 'sale_price_many'})
    salePriceMany?       : number | null;
    @Column({type: 'decimal', precision: 18, scale: 3, nullable: true, name: 'min_stock_branch'})
    minStockBranch?      : number | null;
    @Column({type: 'decimal', precision: 18, scale: 3, nullable: true, name: 'max_stock_branch'})
    maxStockBranch?      : number | null;
    @Column({ type: 'timestamp with time zone', name: 'last_stocked_at', default: () => 'CURRENT_TIMESTAMP' })
    lastStockedAt        : Date;
    @Column({type: 'boolean', name: 'is_sellable', nullable: false})
    isSellable           : boolean;
    @ManyToOne(()=> ProductOrmEntity, (item)=> item.inventoryItems)
    @JoinColumn({name: 'product_id'})
    product?             : ProductOrmEntity | null;
    @ManyToOne(()=> LotOrmEntity, (item)=> item.inventoryItems)
    @JoinColumn({name: 'lot_id'})
    lot?                 : LotOrmEntity | null;
    @ManyToOne(()=> BranchOfficeOrmEntity, (item)=> item.inventoryItems)
    @JoinColumn({name: 'branch_office_id'})
    branchOffice?        : BranchOfficeOrmEntity | null;
    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt?: Date | null;
    @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at', nullable: true })
    deletedAt?: Date | null;
}