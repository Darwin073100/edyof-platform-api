import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryItemOrmEntity } from "./infraestructure/persistence/typeorm/entities/inventory-item.orm-entity";
import { ProductModule } from "src/contexts/product-management/product/product.module";
import { BranchOfficeModule } from "src/contexts/establishment-management/branch-office/branch-office.module";
import { LotModule } from "src/contexts/purchase-management/lot/lot.module";
import { INVENTORY_ITEM_REPOSITORY, InventoryItemRepository } from "./domain/repositories/inventory-item.repository";
import { TypeormInventoryItemRepository } from "./infraestructure/persistence/typeorm/repositories/typeorm-inventory-item.repository";
import { RegisterInventoryItemUseCase } from "./application/use-case/register-inventory-item.use-case";
import { PRODUCT_CHECKER_PORT, ProductCheckerPort } from "src/contexts/product-management/product/domain/ports/out/product-checker.port";
import { LOT_CHECKER_PORT, LotCheckerPort } from "src/contexts/purchase-management/lot/domain/ports/out/lot-checker.port";
import { BRANCH_OFFICE_CHECKER_PORT, BranchOfficeCheckerPort } from "src/contexts/establishment-management/branch-office/domain/ports/out/branch-office-checker.port";
import { InventoryItemController } from "./presentation/controllers/inventory-item.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryItemOrmEntity]),
        ProductModule,
        BranchOfficeModule,
        LotModule
    ],
    providers: [
        {
            provide: INVENTORY_ITEM_REPOSITORY,
            useClass: TypeormInventoryItemRepository
        },
        {
            provide: RegisterInventoryItemUseCase,
            useFactory: (repo: InventoryItemRepository, productCheck:ProductCheckerPort, lotCheck:LotCheckerPort, branchCheck:BranchOfficeCheckerPort)=>{
                return new RegisterInventoryItemUseCase(repo, productCheck, lotCheck, branchCheck)
            },
            inject:[INVENTORY_ITEM_REPOSITORY, PRODUCT_CHECKER_PORT, LOT_CHECKER_PORT, BRANCH_OFFICE_CHECKER_PORT]
        }
    ],
    controllers: [
        InventoryItemController
    ],
    exports: []
})
export class InventoryItemModule{}