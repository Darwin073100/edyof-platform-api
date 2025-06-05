// src/contexts/educational-center-management/educational-center/infrastructure/persistence/typeorm/entities/educational-center.orm-entity.ts

import { BranchOfficeOrmEntity } from 'src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';

/**
 * BrandOrmEntity es una entidad de TypeORM que representa la tabla
 * 'brand' en la base de datos.
 *
 * Esta clase NO es parte de la capa de Dominio. Es una representación de infraestructura
 * para la persistencia. Contiene decoradores específicos de TypeORM.
 */
@Entity('brand') // Mapea esta clase a la tabla 'brand'
export class BrandOrmEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'brand_id' })
  brandId: bigint; // Usamos bigint para corresponder con bigserial de PostgreSQL

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}