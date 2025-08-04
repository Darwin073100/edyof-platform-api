// src/contexts/educational-center-management/educational-center/infrastructure/persistence/typeorm/entities/educational-center.orm-entity.ts
import { ProductOrmEntity } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/entities/product.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { BranchOfficeOrmEntity } from 'src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import { EmployeeRoleOrmEntity } from 'src/contexts/employee-management/employee-role/infraestruture/persistence/typeorm/entities/employee-role-orm-entity';
import { AddressOrmEntity } from 'src/shared/infraestructure/typeorm/address.orm-entity';
import { GenderEnum } from 'src/contexts/employee-management/employee/domain/enums/gender.enum';
import { UserOrmEntity } from 'src/contexts/authentication-management/auth/infraestructure/entities/user.orm-entity';
/**
 * BrandOrmEntity es una entidad de TypeORM que representa la tabla
 * 'brand' en la base de datos.
 *
 * Esta clase NO es parte de la capa de Dominio. Es una representación de infraestructura
 * para la persistencia. Contiene decoradores específicos de TypeORM.
 */
@Entity('employee') // Mapea esta clase a la tabla 'brand'
export class EmployeeOrmEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'employee_id' })
  employeeId: bigint; // Usamos bigint para corresponder con bigserial de PostgreSQL

  @ManyToOne(() => BranchOfficeOrmEntity, { nullable: false })
  @JoinColumn({ name: 'branch_office_id' })
  branchOffice?: BranchOfficeOrmEntity | null;
  @Column({ type: 'bigint', name: 'branch_office_id', nullable: false })
  branchOfficeId: bigint;

  @ManyToOne(() => EmployeeRoleOrmEntity, { nullable: false })
  @JoinColumn({ name: 'employee_role_id' })
  employeeRole?: EmployeeRoleOrmEntity | null;
  @Column({ type: 'bigint', name: 'employee_role_id', nullable: false })
  employeeRoleId: bigint;

  @Column({ type: 'varchar', length: 100, name: 'first_name', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 100, name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 25, name: 'phone_number', nullable: true })
  phoneNumber: string | null;

  @ManyToOne(() => AddressOrmEntity, { nullable: true, cascade: true })
  @JoinColumn({ name: 'address_id' })
  address?: AddressOrmEntity | null;
  @Column({ type: 'bigint', name: 'address_id', nullable: true })
  addressId: bigint | null;

  @Column({ type: 'date', name: 'birth_date', nullable: true })
  birthDate: Date | null;

  @Column({ type: 'enum', enum: GenderEnum, name: 'gender', nullable: true })
  gender: GenderEnum | null;

  @Column({ type: 'date', name: 'hire_date', nullable: false })
  hireDate: Date;

  @Column({ type: 'date', name: 'termination_date', nullable: true })
  terminationDate: Date | null;

  @Column({ type: 'time', name: 'entry_time', nullable: true })
  entryTime: string | null;

  @Column({ type: 'time', name: 'exit_time', nullable: true })
  exitTime: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'current_salary', nullable: false })
  currentSalary: string;

  @Column({ type: 'boolean', name: 'is_active', default: true, nullable: false })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255, name: 'photo_url', nullable: true })
  photoUrl: string | null;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}