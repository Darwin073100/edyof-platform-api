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

@Entity('suplier')
export class SuplierOrmEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'suplier_id',
    type: 'bigint',
  })
  suplierId: bigint;
  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 25, name: 'phone_number', nullable: false })
  phoneNumber: string;
  @Column({ type: 'varchar', length: 13, name: 'rfc', nullable: true, unique:true })
  rfc?: string | null;
  @Column({ type: 'varchar', length: 100, name: 'contact_person', nullable: true })
  contactPerson?: string | null;
  @Column({ type: 'varchar', length: 100, name: 'email', nullable: true, unique: true })
  email?: string | null;
  @Column({ type: 'text', name: 'notes', nullable: true })
  notes?: string | null;
  
  // Clave foránea para la dirección. No es estrictamente necesario mapearla como columna
  // si solo la manejamos a través del objeto de relación, pero es común incluirla.
  @Column({
    type: 'bigint',
    name: 'address_id',
    nullable: false,
    unique: true,
  })
  addressId: bigint;

  // *** Relación 1:1 CON AddressOrmEntity - ¡CASCADE HABILITADO! ***
  // Esta es la "owning side" de la relación 1:1.
  @JoinColumn({ name: 'address_id' }) // Columna FK en 'branch_offices'
  @OneToOne(() => AddressOrmEntity, (address) => address.branchOffice, {
    cascade: true, // Esto es la clave: insertará/actualizará/eliminará la dirección
    // automáticamente cuando se persista la BranchOfficeOrmEntity.
    eager: true, // Carga la dirección automáticamente.
    onDelete: 'CASCADE', // Elimina la dirección si se elimina la sucursal.
  })
  address: AddressOrmEntity; // Propiedad para acceder al objeto de dirección relacionado

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
