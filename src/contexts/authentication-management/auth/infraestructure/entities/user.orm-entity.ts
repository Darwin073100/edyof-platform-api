import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoleOrmEntity } from "./user-role.orm-entity";

@Entity({name: 'user'})
export class UserOrmEntity{
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' }) // Mapea a bigint en PostgreSQL
    userId: bigint; // Usamos snake_case para la base de datos, camelCase para la propiedad JS
    
    @Column({type: 'bigint', name: 'employee_id', nullable: false})
    employeeId: bigint;
    
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'password_hash' }) // Explicitamente mapea a 'password_hash'
    passwordHash: string;

    @Column({ type: 'boolean', default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ type: 'timestamp with time zone', nullable: true, name: 'last_login' })
    lastLogin?: Date | null;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true, name: 'updated_at' })
    updatedAt?: Date | null;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true, name: 'deleted_at' })
    deletedAt?: Date | null;

    @OneToMany(()=> UserRoleOrmEntity, (userRole)=> userRole.user)
    userRoles?: UserRoleOrmEntity[]|[];

}