import { SeasonNameVO } from '../value-objects/season-name.vo';
import { SeasonDescriptionVO } from '../value-objects/season-description.vo';
import { DomainEvent } from 'src/shared/domain/events/domain-events';
import { ProductEntity } from 'src/contexts/product-management/product/domain/entities/product.entity';

export class SeasonEntity {
  private readonly _seasonId: bigint;
  private _name: SeasonNameVO;
  private _description?: SeasonDescriptionVO | null;
  private _dateInit: Date;
  private _dateFinish: Date;
  private _deletedAt: Date | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date | null;
  private _domainEvents: DomainEvent<SeasonEntity>[] = [];
  private _products?: ProductEntity[];

  private constructor(
    seasonId: bigint,
    name: SeasonNameVO,
    dateInit: Date,
    dateFinish: Date,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    description?: SeasonDescriptionVO | null,
    products?: ProductEntity[] | null,
  ) {
    this._seasonId = seasonId;
    this._name = name;
    this._description = description;
    this._dateInit = dateInit;
    this._dateFinish = dateFinish;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
    this._products = products ?? undefined;
  }

  static create(
    name: SeasonNameVO,
    dateInit: Date,
    dateFinish: Date,
    description?: SeasonDescriptionVO | null,
  ): SeasonEntity {
    return new SeasonEntity(
      BigInt(Date.now()),
      name,
      dateInit,
      dateFinish,
      new Date(),
      null,
      null,
      description,
      undefined, // productos siempre undefined/null en create
    );
  }

  static reconstitute(
    seasonId: bigint,
    name: SeasonNameVO,
    dateInit: Date,
    dateFinish: Date,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    description?: SeasonDescriptionVO | null,
    products?: ProductEntity[] | null,
  ): SeasonEntity {
    return new SeasonEntity(
      seasonId,
      name,
      dateInit,
      dateFinish,
      createdAt,
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
}
