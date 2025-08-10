import { Injectable } from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { LotRepository } from 'src/contexts/purchase-management/lot/domain/repositories/lot.repository';
import { LotEntity } from 'src/contexts/purchase-management/lot/domain/entities/lot.entity';
import { LotOrmEntity } from '../entities/lot.orm-entity';
import { LotMapper } from '../mappers/lot.mapper';
import { LotAlreadyExistsException } from 'src/contexts/purchase-management/lot/domain/exceptions/lot-already-exists.exception';
import { LotUnitPurchaseOrmEntity } from '../entities/lot-unit-purchase.orm-entity';

@Injectable()
export class TypeOrmLotRepository implements LotRepository {
  private ormLotRepository: Repository<LotOrmEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.ormLotRepository = this.dataSource.getRepository(LotOrmEntity);
  }

  async save(lotEntity: LotEntity): Promise<LotEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Conversion de una entidad de dominio a una entidad de Typeorm
      const lotOrmEntity = LotMapper.toOrm(lotEntity);
      const lotUnitPurchases = lotOrmEntity.lotUnitPurchases;
      // Limpiar lotUnitPurchases para evitar problemas de referencia circular
      const lotOrmEntityClean = {
        ...lotOrmEntity,
        lotUnitPurchases: undefined,
      }

      // Guardar la entidad
      const resp = await queryRunner.manager.save(LotOrmEntity, lotOrmEntityClean);
      // Guardar las relaciones de lotUnitPurchases
      if (lotUnitPurchases && lotUnitPurchases.length > 0) {

        // verificar que no vengan repetidos los unidades de compra, 
        // lanzar un error si es así y hacer rollback de la transacción
        const uniqueUnits = new Set();
        for (const item of lotUnitPurchases) {
          if (uniqueUnits.has(item.lotUnitPurchaseId)) {
            throw new LotAlreadyExistsException('Los unidades de compra no pueden estar duplicados');
          }
          uniqueUnits.add(item.lotUnitPurchaseId);
        }
        // Asignar lotId a cada lotUnitPurchase
        lotUnitPurchases.forEach(item => {
          item.lotId = resp.lotId;
        });
        await queryRunner.manager.save(LotUnitPurchaseOrmEntity, lotUnitPurchases);
      }
      // Confirmar la transacción
      await queryRunner.commitTransaction();
      // Convertir una entidad de Typeorm a una entidad de dominio
      return LotMapper.toDomain(resp);
    } catch (error) {
        // Revertir la transacción en caso de error
        await queryRunner.rollbackTransaction();

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
