import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryOrmEntity } from "./infraestructure/persistence/typeorm/entities/inventory.orm-entity";
import { ProductModule } from "src/contexts/product-management/product/product.module";
import { BranchOfficeModule } from "src/contexts/establishment-management/branch-office/branch-office.module";
import { LotModule } from "src/contexts/purchase-management/lot/lot.module";
import { INVENTORY_REPOSITORY, InventoryRepository } from "./domain/repositories/inventory.repository";
import { TypeormInventoryRepository } from "./infraestructure/persistence/typeorm/repositories/typeorm-inventory.repository";
import { RegisterInventoryUseCase } from "./application/use-case/register-inventory.use-case";
import { PRODUCT_CHECKER_PORT, ProductCheckerPort } from "src/contexts/product-management/product/domain/ports/out/product-checker.port";
import { LOT_CHECKER_PORT, LotCheckerPort } from "src/contexts/purchase-management/lot/domain/ports/out/lot-checker.port";
import { BRANCH_OFFICE_CHECKER_PORT, BranchOfficeCheckerPort } from "src/contexts/establishment-management/branch-office/domain/ports/out/branch-office-checker.port";
import { InventoryController } from "./presentation/controllers/inventory.controller";
import { ViewAllInventoryUseCase } from "./application/use-case/view-all-inventory.use-case";
import { INVENTORY_CHECKER_PORT } from "./domain/port/out/inventory-ckecker.port";
import { InventoryCheckerAdapter } from "./infraestructure/persistence/typeorm/external-services/inventory-checker.adapter";

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryOrmEntity]),
        ProductModule,
        BranchOfficeModule,
        LotModule
    ],
    providers: [
        {
            provide: INVENTORY_REPOSITORY,
            useClass: TypeormInventoryRepository
        },
        {
            provide: INVENTORY_CHECKER_PORT,
            useClass: InventoryCheckerAdapter
        },
        {
            provide: RegisterInventoryUseCase,
            useFactory: (repo: InventoryRepository, productCheck:ProductCheckerPort, lotCheck:LotCheckerPort, branchCheck:BranchOfficeCheckerPort)=>{
                return new RegisterInventoryUseCase(repo, productCheck, lotCheck, branchCheck)
            },
            inject:[INVENTORY_REPOSITORY, PRODUCT_CHECKER_PORT, LOT_CHECKER_PORT, BRANCH_OFFICE_CHECKER_PORT]
        },
        {
            provide: ViewAllInventoryUseCase,
            useFactory: (repository: InventoryRepository)=>{
                return new ViewAllInventoryUseCase(repository);
            },
            inject:[INVENTORY_REPOSITORY]
        }
    ],
    controllers: [
        InventoryController
    ],
    exports: [
        INVENTORY_CHECKER_PORT
    ]
})
export class InventoryModule{}