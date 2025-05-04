import { Module } from "@nestjs/common";
import { ESTABLISHMENT_REPOSITORY } from "src/core/establishment/domain/repositories/establishment.repository";
import { EstablishmentRepositoryImpl } from "./persistence/repositories/establishment.repository.impl";
import { EstablishmentController } from "./http/controllers/establishment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstablishmentSchema } from "./persistence/schemas/establishment.schema";
import { EstablishmentService } from "../application/services/establishment.service";
import { CreateNewEstablishmentUseCase } from "../application/use-case/create.new.establishment.use-case";
import { ViewAllEstablishmentUseCase } from "../application/use-case/view.all.establishment.use-case";

@Module({
    imports:[
        TypeOrmModule.forFeature([EstablishmentSchema])
    ],
    providers:[
        {
            provide: ESTABLISHMENT_REPOSITORY,
            useClass: EstablishmentRepositoryImpl
        },
        EstablishmentService,
        CreateNewEstablishmentUseCase,
        ViewAllEstablishmentUseCase,
    ],
    controllers:[
        EstablishmentController
    ],
    exports:[
        EstablishmentService
    ]
})
export class EstablishmentModule{}