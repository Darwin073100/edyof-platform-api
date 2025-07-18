import { Repository, QueryFailedError } from "typeorm";
import { SeasonOrmEntity } from "../entities/season.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SeasonMapper } from "../mappers/season.mapper";
import { SeasonEntity } from "src/contexts/product-management/season/domain/entities/season.entity";
import { SeasonRepository } from "src/contexts/product-management/season/domain/repositories/season.repository";
import { SeasonAlreadyExistsException } from "src/contexts/product-management/season/domain/exceptions/season-already-exists.exception";

export class TypeormSeasonRepository implements SeasonRepository {
  private readonly typeormRepository: Repository<SeasonOrmEntity>;
  constructor(
    @InjectRepository(SeasonOrmEntity)
    typeormRepository: Repository<SeasonOrmEntity>,
  ) {
    this.typeormRepository = typeormRepository;
  }

  async findById(seasonId: bigint): Promise<SeasonEntity | null> {
    const ormEntity = await this.typeormRepository.findOne({
      where: { seasonId: seasonId },
    });
    if (!ormEntity) {
      return Promise.resolve(null);
    }
    return SeasonMapper.toDomainEntity(ormEntity);
  }

  async findAll(): Promise<SeasonEntity[]> {
    const result = await this.typeormRepository.find({});
    const seasonList = result.map(item => SeasonMapper.toDomainEntity(item)); 
    return seasonList;
  }
  
  async save(entity: SeasonEntity): Promise<SeasonEntity> {
    try {
      let ormEntity = await this.typeormRepository.findOne({
        where: { seasonId: entity.seasonId },
      });
      if (ormEntity) {
        ormEntity.name = entity.name.value;
        ormEntity.description = entity.description?.value ?? null;
        ormEntity.dateInit = entity.dateInit;
        ormEntity.dateFinish = entity.dateFinish;
        ormEntity.updatedAt = entity.updatedAt;
        ormEntity.deletedAt = entity.deletedAt;
      } else {
        ormEntity = SeasonMapper.toOrmEntity(entity);
      }
      const saved = await this.typeormRepository.save(ormEntity);
      return SeasonMapper.toDomainEntity(saved);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const pgError = error as any;
        if (pgError.code === '23505') {
          throw new SeasonAlreadyExistsException('Ya existe una temporada con ese nombre.');
        }
      }
      throw error;
    }
  }

  delete(entityId: bigint): Promise<SeasonEntity | null> {
    throw new Error('Este metodo no está impementado');
  }
}
