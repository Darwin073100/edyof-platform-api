import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LotOrmEntity } from "./infraestructura/persistence/typeorm/entities/lot.orm-entity";
import { ProductModule } from "src/contexts/product-management/product/product.module";
import { LotController } from "./presentation/controllers/lot.controller";
import { LOT_REPOSITORY, LotRepository } from "./domain/repositories/lot.repository";
import { TypeOrmLotRepository } from "./infraestructura/persistence/typeorm/repositories/typeorm-lot.repository";
import { RegisterLotUseCase } from "./application/use-case/register-lot.use-case";
import { PRODUCT_CHECKER_PORT, ProductCheckerPort } from "src/contexts/product-management/product/domain/ports/out/product-checker.port";

@Module({
    imports:[
        TypeOrmModule.forFeature([LotOrmEntity]),
        ProductModule
    ],
    providers:[
        {
            provide: LOT_REPOSITORY,
            useClass: TypeOrmLotRepository
        },
        {
            provide: RegisterLotUseCase,
            useFactory: (repo: LotRepository, productChecker: ProductCheckerPort)=>{
                return new RegisterLotUseCase(repo, productChecker);
            },
            inject: [
                LOT_REPOSITORY,
                PRODUCT_CHECKER_PORT
            ]
        }
    ],
    controllers: [
        LotController
    ]
})
export class LotModule{}