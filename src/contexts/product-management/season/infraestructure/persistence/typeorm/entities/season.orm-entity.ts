// Infraestructura de TypeORM para la entidad Season
import { ProductOrmEntity } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/entities/product.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('season')
export class SeasonOrmEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'season_id' })
  seasonId: bigint;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'date', name: 'date_init', nullable: true })
  dateInit?: Date | null;

  @Column({ type: 'date', name: 'date_finish', nullable: true })
  dateFinish?: Date | null;

  @OneToMany(() => ProductOrmEntity, (product) => product.category)
  products?: ProductOrmEntity[]|null;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date | null;
  
  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at', nullable: true })
  deletedAt?: Date | null;
}
