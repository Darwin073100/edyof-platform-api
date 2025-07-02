import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleOrmEntity } from "src/contexts/authentication-management/role/infraestructure/persistence/typeorm/entities/role.orm-entity";
import { PermissionOrmEntity } from "src/contexts/authentication-management/permission/infraestructure/persistence/typeorm/entities/permission.orm-entity";

@Entity({name: 'role_permission'})
export class RolePermissionOrmEntity{
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'role_permission_id' }) // Mapea a bigint en PostgreSQL
    rolePermissionId: bigint; // Usamos snake_case para la base de datos, camelCase para la propiedad JS
    
    @Column({type: 'bigint', name: 'permission_id', nullable: false})
    permissionId: bigint;

    @Column({type: 'bigint', name: 'role_id', nullable: false})
    roleId: bigint;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true, name: 'updated_at' })
    updatedAt?: Date | null;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true, name: 'deleted_at' })
    deletedAt?: Date | null;

    @JoinColumn({name: 'role_id'})
    @ManyToOne(()=> RoleOrmEntity, (role)=> role.rolePermissions,{
        cascade: true, // Esto es la clave: insertará/actualizará/eliminará el role
        // automáticamente cuando se persista el UserOfficeOrmEntity.
        eager: true, // Carga el RolePermission automáticamente.
        onDelete: 'CASCADE', // Elimina el RolePermission si se elimina el User.
    })
    role?: RoleOrmEntity | null;

    @JoinColumn({name: 'permission_id'})
    @ManyToOne(()=>PermissionOrmEntity, (permission)=> permission.rolePermissions)
    permission?: PermissionOrmEntity | null;
}