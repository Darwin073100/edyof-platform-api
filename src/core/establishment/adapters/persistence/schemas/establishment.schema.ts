import { BaseSchema } from "src/core/shared/persistence/base.schema";
import { Column, OneToMany, PrimaryGeneratedColumn, Entity as Schema } from "typeorm";
import { BranchOfficeSchema } from "../../../../branch-office/adapters/persistence/schemas/branch-office.schema";

@Schema({name: 'establishment'})
export class EstablishmentSchema extends BaseSchema {
    @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'establishment_id'})
    establishmentId?: bigint;
    @Column({name: 'name', type: 'varchar', unique: true})
    name: string;

    @OneToMany(()=> BranchOfficeSchema, (branchOfficeSchema)=> branchOfficeSchema.educationalCenter)
    branchOffices?: BranchOfficeSchema[];
}