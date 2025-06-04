import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'category'})
export class CategoryOrmEntity{
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'category_id' })
    categoryId: bigint; // Usamos bigint para corresponder con bigserial de PostgreSQL

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    name: string;

    @Column({name: 'description', type: 'text', nullable: true})
    description?: string|null;

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date | null;
    
    @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at', nullable: true })
    deletedAt: Date | null;s
}