import { EmployeeOrmEntity } from 'src/contexts/employee-management/employee/infraestruture/persistence/typeorm/entities/employee-orm-entity';
import { BranchOfficeOrmEntity } from 'src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import {
    Entity,
    PrimaryGeneratedColumn, // ID generado automáticamente por la BD
    Column,
    OneToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  // Importación circular evitada si BranchOfficeOrmEntity usa esta AddressOrmEntity
  // y AddressOrmEntity solo necesita BranchOfficeOrmEntity para la relación inversa.
  // Si BranchOfficeOrmEntity es el "owning side" y AddressOrmEntity la "inverse side",
  // esta importación no causa problema.
  @Entity('address') // Nombre de la tabla en la base de datos
  export class AddressOrmEntity {
    @PrimaryGeneratedColumn(
      'increment', {
      name: 'address_id', 
      type: 'bigint' 
    })
    addressId: bigint; // ID de la dirección
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    street: string;
  
    @Column({ type: 'varchar', length: 20, nullable: false, name: 'external_number' })
    externalNumber: string;
  
    @Column({ type: 'varchar', length: 20, nullable: true, name: 'internal_number' })
    internalNumber?: string | null;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    municipality: string;
    
    @Column({ type: 'varchar', length: 100, nullable: false })
    neighborhood: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    city: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    state: string;
  
    @Column({ type: 'varchar', length: 10, nullable: false, name: 'postal_code' })
    postalCode: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    country: string;

    @Column({ type: 'text', nullable: true })
    reference?: string|null;
  
    // Relación 1:1 inversa: una dirección pertenece a una sucursal.
    // 'branchOffice' en BranchOfficeOrmEntity es la propiedad que mapea esta relación.
    // Aquí no necesitamos cascade ni JoinColumn, la relación es definida en BranchOfficeOrmEntity.
    @OneToOne(() => BranchOfficeOrmEntity, branchOffice => branchOffice.address)
    branchOffice: BranchOfficeOrmEntity;

    // Relación 1:N inversa: una dirección puede estar asociada a muchos empleados.
    // 'address' en EmployeeOrmEntity es la propiedad que mapea esta relación.
    @OneToMany(() => EmployeeOrmEntity, employee => employee.address)
    employees?: EmployeeOrmEntity[];

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date | null;

    @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at', nullable: true })
    deletedAt: Date | null;
  }