// src/contexts/educational-center-management/educational-center/infrastructure/persistence/typeorm/entities/educational-center.orm-entity.ts

import { BranchOfficeOrmEntity } from 'src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import { ProductOrmEntity } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/entities/product.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';

/**
 * EducationalCenterOrmEntity es una entidad de TypeORM que representa la tabla
 * 'educational_centers' en la base de datos.
 *
 * Esta clase NO es parte de la capa de Dominio. Es una representación de infraestructura
 * para la persistencia. Contiene decoradores específicos de TypeORM.
 */
@Entity('establishment') // Mapea esta clase a la tabla 'educational_centers'
export class EstablishmentOrmEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'establishment_id' })
  establishmentId: bigint; // Usamos bigint para corresponder con bigserial de PostgreSQL

  @Column({ type: 'varchar', length: 250, unique: true, nullable: false })
  name: string;

  @OneToMany(()=> BranchOfficeOrmEntity, branchOffice=> branchOffice.establishment)
  branchOffices: BranchOfficeOrmEntity[];

  @OneToMany(() => ProductOrmEntity, (product) => product.establishment)
  products?: ProductOrmEntity[] | null;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}