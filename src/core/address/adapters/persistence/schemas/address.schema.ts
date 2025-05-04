import { BaseSchema } from "src/core/shared/persistence/base.schema";
import { Column, PrimaryGeneratedColumn, Entity as Schema } from "typeorm";

@Schema({name: 'address'})
export class AddressSchema extends BaseSchema{
    @PrimaryGeneratedColumn('increment', {name: 'address_id', type: 'bigint'})
    addressId?: bigint;
    @Column({name: 'postal_code', type: 'int', nullable: false})
    postalCode: number;
    @Column({name: 'street', type: 'text', nullable: false})
    street: string;
    @Column({name: 'interior_number', type: 'varchar', length: 10, nullable: true})
    interiorNumber: string;
    @Column({name: 'exterior_number', type: 'varchar', length: 10, nullable: true})
    exteriorNumber: string;
    @Column({name: 'district', type: 'text', nullable: false})
    district: string;
    @Column({name: 'city', type: 'text', nullable: false})
    city: string;
    @Column({name: 'state', type: 'varchar', length: 100})
    state: string;
}