import { SeasonNameVO } from '../value-objects/season-name.vo';
import { SeasonDescriptionVO } from '../value-objects/season-description.vo';
import { DomainEvent } from 'src/shared/domain/events/domain-events';
import { ProductEntity } from 'src/contexts/product-management/product/domain/entities/product.entity';

export class SeasonEntity {
  private readonly _seasonId: bigint;
  private _name: SeasonNameVO;
  private _description?: SeasonDescriptionVO | null;
  private _dateInit?: Date | null;
  private _dateFinish?: Date | null;
  private _deletedAt: Date | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date | null;
  private _domainEvents: DomainEvent<SeasonEntity>[] = [];
  private _products?: ProductEntity[];

  private constructor(
    seasonId: bigint,
    name: SeasonNameVO,
    createdAt: Date,
    dateInit?: Date | null,
    dateFinish?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
    description?: SeasonDescriptionVO | null,
    products?: ProductEntity[] | null,
  ) {
    this._seasonId = seasonId;
    this._name = name;
    this._description = description;
    this._dateInit = dateInit;
    this._dateFinish = dateFinish;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt ?? null;
    this._deletedAt = deletedAt ?? null;
    this._products = products ?? undefined;
  }

  static create(
    name: SeasonNameVO,
    dateInit?: Date | null,
    dateFinish?: Date | null,
    description?: SeasonDescriptionVO | null,
  ): SeasonEntity {
    return new SeasonEntity(
      BigInt(Date.now()),
      name,
      new Date(),
      dateInit,
      dateFinish,
      null,
      null,
      description,
      undefined, // productos siempre undefined/null en create
    );
  }

  static reconstitute(
    seasonId: bigint,
    name: SeasonNameVO,
    createdAt: Date,
    dateInit?: Date | null,
    dateFinish?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
    description?: SeasonDescriptionVO | null,
    products?: ProductEntity[] | null,
  ): SeasonEntity {
    return new SeasonEntity(
      seasonId,
      name,
      createdAt,
      dateInit,
      dateFinish,
      updatedAt,
      deletedAt,
      description,
      products,
    );
  }

  get seasonId() { return this._seasonId; }
  get name() { return this._name; }
  get description() { return this._description; }
  get dateInit() { return this._dateInit; }
  get dateFinish() { return this._dateFinish; }
  get createdAt() { return this._createdAt; }
  get updatedAt() { return this._updatedAt; }
  get deletedAt() { return this._deletedAt; }
  get products(): ProductEntity[] | undefined {
    return this._products;
  }

  updateName(name: SeasonNameVO): void {
    if (this._name !== name) {
      this._name = name;
      this._updatedAt = new Date();
    }
  }

  updateDescription(description: SeasonDescriptionVO | null): void {
    if (this._description !== description) {
      this._description = description;
      this._updatedAt = new Date();
    }
  }

  updateDateInit(dateInit: Date | null): void {
    if (this._dateInit !== dateInit) {
      this._dateInit = dateInit;
      this._updatedAt = new Date();
    }
  }

  updateDateFinish(dateFinish: Date | null): void {
    if (this._dateFinish !== dateFinish) {
      this._dateFinish = dateFinish;
      this._updatedAt = new Date();
    }
  }
}
