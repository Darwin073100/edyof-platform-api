import { Injectable } from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { LotRepository } from 'src/contexts/purchase-management/lot/domain/repositories/lot.repository';
import { LotEntity } from 'src/contexts/purchase-management/lot/domain/entities/lot.entity';
import { LotOrmEntity } from '../entities/lot.orm-entity';
import { LotMapper } from '../mappers/lot.mapper';
import { LotAlreadyExistsException } from 'src/contexts/purchase-management/lot/domain/exceptions/lot-already-exists.exception';

@Injectable()
export class TypeOrmLotRepository implements LotRepository {
  private ormLotRepository: Repository<LotOrmEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.ormLotRepository = this.dataSource.getRepository(LotOrmEntity);
  }

  async save(lotEntity: LotEntity): Promise<LotEntity> {
    try {
      // Conversion de una entidad de dominio a una entidad de Typeorm
      const lotOrmEntity = LotMapper.toOrm(lotEntity);
      // Guardar la entidad
      const resp = await this.ormLotRepository.save(lotOrmEntity);
      // Convertir una entidad de Typeorm a una entidad de dominio
      return LotMapper.toDomain(resp);
    } catch (error) {
        if(error instanceof QueryFailedError) {
          const pgError = error as any;
          // Manejo de errores específicos de TypeORM
          if (pgError.code === '23505') { // Código de error para violación de clave única
            throw new LotAlreadyExistsException('Ya existe un lote con el mismo número de lote o producto.');
          }
        }
      throw error;
    }
  }

  async findById(id: bigint): Promise<LotEntity | null> {
    const lotOrmEntity = await this.ormLotRepository.findOne({
      where: { lotId: id },
      relations: ['product'],
    });
    if (!lotOrmEntity) {
      return null;
    }
    return LotMapper.toDomain(lotOrmEntity);
  }

  delete(entityId: bigint): Promise<LotEntity | null> {
    throw new Error('Este metodo no esta implementado');
  }

  findAll(): Promise<LotEntity[]> {
    throw new Error('Este metodo no esta implementado');
  }
}
