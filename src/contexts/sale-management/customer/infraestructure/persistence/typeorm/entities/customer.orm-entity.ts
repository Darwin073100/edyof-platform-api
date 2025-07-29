import { AddressOrmEntity } from 'src/shared/infraestructure/typeorm/address.orm-entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('customer')
export class CustomerOrmEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'customer_id',
    type: 'bigint',
  })
  customerId: bigint;
  @Column({ type: 'varchar', length: 150, nullable: false , name: 'first_name'})
  firstName: string;
  @Column({ type: 'varchar', length: 100, nullable: true , name: 'last_name'})
  lastName?: string|null;
  @Column({ type: 'varchar', length: 150, nullable: true , name: 'company_name'})
  companyName?: string|null;
  @Column({ type: 'varchar', length: 25, name: 'phone_number', nullable: true })
  phoneNumber?: string|null;
  @Column({ type: 'varchar', length: 13, name: 'rfc', nullable: true, unique:true })
  rfc?: string | null;
  @Column({ type: 'varchar', length: 100, name: 'email', nullable: true, unique: true })
  email?: string | null;
  @Column({ type: 'varchar', name: 'customer_type', length: 50, nullable: true })
  customerType?: string | null;
  
  // Clave foránea para la dirección. No es estrictamente necesario mapearla como columna
  // si solo la manejamos a través del objeto de relación, pero es común incluirla.
  @Column({
    type: 'bigint',
    name: 'address_id',
    nullable: true,
    unique: true,
  })
  addressId?: bigint|null;

  // *** Relación 1:1 CON AddressOrmEntity - ¡CASCADE HABILITADO! ***
  // Esta es la "owning side" de la relación 1:1.
  @JoinColumn({ name: 'address_id' }) // Columna FK en 'branch_offices'
  @OneToOne(() => AddressOrmEntity, (address) => address.branchOffice, {
    cascade: true, // Esto es la clave: insertará/actualizará/eliminará la dirección
    // automáticamente cuando se persista la BranchOfficeOrmEntity.
    eager: true, // Carga la dirección automáticamente.
    onDelete: 'CASCADE', // Elimina la dirección si se elimina la sucursal.
  })
  address?: AddressOrmEntity|null; // Propiedad para acceder al objeto de dirección relacionado

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;
}
