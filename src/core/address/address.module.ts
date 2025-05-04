import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ADDRESS_REPOSITORY } from "./domain/repositories/address.repository";
import { AddressRepositoryImpl } from "src/core/address/adapters/persistence/repositories/address.repository.impl";
import { AddressService } from "./application/services/address.service";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";
import { AddressSchema } from "src/core/address/adapters/persistence/schemas/address.schema";
import { CreateNewAddressUseCase } from "./application/use-cases/create.new.address.use-case";

@Module({
    imports:[
        TypeOrmModule.forFeature([AddressSchema]),
        TransactionModule
    ],
    providers:[
        {
            provide: ADDRESS_REPOSITORY,
            useClass: AddressRepositoryImpl
        },
        AddressService,
        CreateNewAddressUseCase
    ],
    exports: [
        CreateNewAddressUseCase
    ]
})

export class AddressModule{}