import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ProductOrmEntity } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/entities/product.orm-entity';
import { InventoryItemOrmEntity } from 'src/contexts/inventory-management/inventory-item/infraestructure/persistence/typeorm/entities/inventory-item.orm-entity';
import { LotUnitPurchaseOrmEntity } from './lot-unit-purchase.orm-entity';
import { ForSaleEnum } from 'src/shared/domain/enums/for-sale.enum';

@Entity('lot')
@Index(['productId', 'lotNumber'], { unique: true })
export class LotOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'lot_id' })
  lotId: bigint;

  @Column({ type: 'bigint', name: 'product_id' })
  productId: bigint;

  @ManyToOne(() => ProductOrmEntity, (product) => product.lots, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product?: ProductOrmEntity | null;

  @Column({ type: 'varchar', length: 50, name: 'lot_number' })
  lotNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 4, name: 'purchase_price' })
  purchasePrice: string;

  @Column({ type: 'enum', enum: ForSaleEnum, name: 'purchase_unit', nullable: false })
  purchaseUnit: ForSaleEnum;

  @Column({ type: 'decimal', precision: 18, scale: 3, name: 'initial_quantity' })
  initialQuantity: string;

  @Column({ type: 'date', name: 'expiration_date', nullable: true })
  expirationDate?: Date | null;

  @Column({ type: 'date', name: 'manufacturing_date', nullable: true })
  manufacturingDate?: Date | null;

  @Column({ type: 'date', name: 'received_date', default: () => 'CURRENT_DATE' })
  receivedDate: Date;

  @OneToMany(()=> InventoryItemOrmEntity, (item)=> item.lot, {cascade: true})
  inventoryItems?: InventoryItemOrmEntity[];

  @OneToMany(()=> LotUnitPurchaseOrmEntity, (lotUnitPurchase)=> lotUnitPurchase.lot, {cascade: true})
  lotUnitPurchases?: LotUnitPurchaseOrmEntity[]|null

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt?: Date | null;
}
