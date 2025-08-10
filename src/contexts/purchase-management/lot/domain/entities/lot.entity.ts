import { DomainEvent } from 'src/shared/domain/events/domain-events';
import { LotNumberVO } from '../value-objects/lot-number.vo';
import { PurchasePriceVO } from '../value-objects/purchase-price.vo';
import { InitialQuantityVO } from '../value-objects/initial-quantity.vo';
import { ExpirationDateVO } from '../value-objects/expiration-date.vo';
import { ManufacturingDateVO } from '../value-objects/manufacturing-date.vo';
import { ReceivedDateVO } from '../value-objects/received-date.vo';
import { ProductEntity } from 'src/contexts/product-management/product/domain/entities/product.entity';
import { InventoryItemEntity } from 'src/contexts/inventory-management/inventory-item/domain/entities/inventory-item.entity';
import { LotUnitPurchaseEntity } from './lot-unit-purchase.entity';
import { ForSaleEnum } from 'src/shared/domain/enums/for-sale.enum';

export class LotEntity {
  private readonly _lotId: bigint;
  private readonly _productId: bigint;
  private _lotNumber: LotNumberVO;
  private _purchasePrice: PurchasePriceVO;
  private _initialQuantity: InitialQuantityVO;
  private _purchaseUnit: ForSaleEnum;
  private _expirationDate?: ExpirationDateVO | null;
  private _manufacturingDate?: ManufacturingDateVO | null;
  private readonly _receivedDate: ReceivedDateVO;
  private readonly _createdAt: Date;
  private _updatedAt?: Date | null;
  private _deletedAt?: Date | null;
  private _domainEvents: DomainEvent<LotEntity>[] = [];

  private _product?: ProductEntity | null;
  private _inventoryItems?: InventoryItemEntity[] | null;
  private _lotUnitPurchases?: LotUnitPurchaseEntity[] | null;

  private constructor(
    lotId: bigint,
    productId: bigint,
    lotNumber: LotNumberVO,
    purchasePrice: PurchasePriceVO,
    initialQuantity: InitialQuantityVO,
    purchaseUnit: ForSaleEnum,
    receivedDate: ReceivedDateVO,
    createdAt: Date,
    expirationDate?: ExpirationDateVO | null,
    manufacturingDate?: ManufacturingDateVO | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
    product?: ProductEntity | null,
    inventoryItems?: InventoryItemEntity[] | null,
    lotUnitPurchases?: LotUnitPurchaseEntity[] | null,
  ) {
    this._lotId = lotId;
    this._productId = productId;
    this._lotNumber = lotNumber;
    this._purchasePrice = purchasePrice;
    this._initialQuantity = initialQuantity;
    this._purchaseUnit = purchaseUnit;

    this._expirationDate = expirationDate;
    this._manufacturingDate = manufacturingDate;
    this._receivedDate = receivedDate;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
    this._product = product ?? null;
    this._inventoryItems = inventoryItems ?? null;
    this._lotUnitPurchases = lotUnitPurchases ?? null;
  }

  static create(
    lotId: bigint,
    productId: bigint,
    lotNumber: LotNumberVO,
    purchasePrice: PurchasePriceVO,
    initialQuantity: InitialQuantityVO,
    purchaseUnit: ForSaleEnum,
    receivedDate: ReceivedDateVO,
    expirationDate?: ExpirationDateVO| null,
    manufacturingDate?: ManufacturingDateVO| null,
  ): LotEntity {
    const now = new Date();
    return new LotEntity(
      lotId,
      productId,
      lotNumber,
      purchasePrice,
      initialQuantity,
      purchaseUnit,
      receivedDate,
      now,
      expirationDate,
      manufacturingDate,
      null,
      null,
      null,
      null,
      null,
    );
  }

  static reconstitute(
    lotId: bigint,
    productId: bigint,
    lotNumber: LotNumberVO,
    purchasePrice: PurchasePriceVO,
    initialQuantity: InitialQuantityVO,
    purchaseUnit: ForSaleEnum,
    receivedDate: ReceivedDateVO,
    createdAt: Date,
    expirationDate?: ExpirationDateVO | null,
    manufacturingDate?: ManufacturingDateVO | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
    product?: ProductEntity | null,
    inventoryItems?: InventoryItemEntity[] | null,
    lotUnitPurchases?: LotUnitPurchaseEntity[] | null,
  ): LotEntity {
    return new LotEntity(
      lotId,
      productId,
      lotNumber,
      purchasePrice,
      initialQuantity,
      purchaseUnit,
      receivedDate,
      createdAt,
      expirationDate,
      manufacturingDate,
      updatedAt,
      deletedAt,
      product ?? null,
      inventoryItems ?? null,
      lotUnitPurchases ?? null,
    );
  }

  // Getters
  get lotId(): bigint {
    return this._lotId;
  }
  get productId(): bigint {
    return this._productId;
  }
  get lotNumber(): LotNumberVO {
    return this._lotNumber;
  }
  get purchasePrice(): PurchasePriceVO {
    return this._purchasePrice;
  }
  get initialQuantity(): InitialQuantityVO {
    return this._initialQuantity;
  }
  get purchaseUnit(): ForSaleEnum {
    return this._purchaseUnit;
  }
  get expirationDate(): ExpirationDateVO | null | undefined {
    return this._expirationDate;
  }
  get manufacturingDate(): ManufacturingDateVO | null | undefined {
    return this._manufacturingDate;
  }
  get receivedDate(): ReceivedDateVO {
    return this._receivedDate;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date | null | undefined {
    return this._updatedAt;
  }
  get deletedAt(): Date | null | undefined {
    return this._deletedAt;
  }
  get product(): ProductEntity | null | undefined {
    return this._product;
  }
  get inventoryItems(): InventoryItemEntity[] | null | undefined {
    return this._inventoryItems;
  }
  get lotUnitPurchases(): LotUnitPurchaseEntity[] | null | undefined {
    return this._lotUnitPurchases;
  }

  // Métodos de dominio
  public updateLotNumber(newLotNumber: LotNumberVO): void {
    if (this._lotNumber.value === newLotNumber.value) return;
    this._lotNumber = newLotNumber;
    this._updatedAt = new Date();
  }

  public updatePurchasePrice(newPrice: PurchasePriceVO): void {
    if (this._purchasePrice.value === newPrice.value) return;
    this._purchasePrice = newPrice;
    this._updatedAt = new Date();
  }

  public updateInitialQuantity(newQuantity: InitialQuantityVO): void {
    if (this._initialQuantity.value === newQuantity.value) return;
    this._initialQuantity = newQuantity;
    this._updatedAt = new Date();
  }

  public updateExpirationDate(newDate: ExpirationDateVO): void {
    if (newDate) {
      if (this._expirationDate?.value?.getTime() === newDate.value?.getTime()) return;
      this._expirationDate = newDate;
      this._updatedAt = new Date();
    } 
  }

  public updateManufacturingDate(newDate: ManufacturingDateVO): void {
    if (newDate){
      if (this._manufacturingDate?.value?.getTime() === newDate.value?.getTime()) return;
      this._manufacturingDate = newDate;
      this._updatedAt = new Date();
    }
  }

  public softDelete(): void {
    if (this._deletedAt) return;
    this._deletedAt = new Date();
    this._updatedAt = new Date();
  }

  public restore(): void {
    if (!this._deletedAt) return;
    this._deletedAt = null;
    this._updatedAt = new Date();
  }

  public getAndClearEvents(): DomainEvent<LotEntity>[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }

  private recordEvent(event: DomainEvent<LotEntity>): void {
    this._domainEvents.push(event);
  }
}
