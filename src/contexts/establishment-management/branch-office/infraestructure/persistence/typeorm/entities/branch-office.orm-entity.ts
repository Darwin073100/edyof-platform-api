import { EstablishmentOrmEntity } from 'src/contexts/establishment-management/establishment/infraestruture/persistence/typeorm/entities/establishment-orm-entity';
import { AddressOrmEntity } from 'src/shared/infraestructure/typeorm/address.orm-entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('branch_office')
export class BranchOfficeOrmEntity {
  @PrimaryGeneratedColumn('increment',{
    name: 'branch_office_id',
    type: 'bigint',
  })
  branchOfficeId: bigint;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

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

  @Column({
    type: 'bigint',
    name: 'establishment_id',
  })
  establishmentId: bigint;

  @ManyToOne(() => EstablishmentOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'establishment_id' })
  establishment: EstablishmentOrmEntity;

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
