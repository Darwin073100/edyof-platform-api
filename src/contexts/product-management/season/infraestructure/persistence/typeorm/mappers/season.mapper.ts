import { SeasonEntity } from "src/contexts/product-management/season/domain/entities/season.entity";
import { SeasonOrmEntity } from "../entities/season.orm-entity";
import { SeasonNameVO } from "src/contexts/product-management/season/domain/value-objects/season-name.vo";
import { SeasonDescriptionVO } from "src/contexts/product-management/season/domain/value-objects/season-description.vo";

export class SeasonMapper {
  static toOrmEntity(domainEntity: SeasonEntity): SeasonOrmEntity {
    const ormEntity = new SeasonOrmEntity();
    ormEntity.seasonId = domainEntity.seasonId;
    ormEntity.name = domainEntity.name.value;
    ormEntity.description = domainEntity.description?.value ?? null;
    ormEntity.dateInit = domainEntity.dateInit;
    ormEntity.dateFinish = domainEntity.dateFinish;
    ormEntity.createdAt = domainEntity.createdAt;
    ormEntity.updatedAt = domainEntity.updatedAt;
    ormEntity.deletedAt = domainEntity.deletedAt;
    return ormEntity;
  }

  static toDomainEntity(ormEntity: SeasonOrmEntity): SeasonEntity {
    return SeasonEntity.reconstitute(
      ormEntity.seasonId,
      SeasonNameVO.create(ormEntity.name),
      ormEntity.dateInit,
      ormEntity.dateFinish,
      ormEntity.createdAt,
      ormEntity.updatedAt,
      ormEntity.deletedAt,
      SeasonDescriptionVO.create(ormEntity.description)
    );
  }
}
