import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryItemOrmEntity } from "./infraestructure/persistence/typeorm/entities/inventory-item.orm-entity";
import { INVENTORY_ITEM_REPOSITORY, InventoryItemRepository } from "./domain/repositories/inventory-item.repository";
import { TypeormInventoryItemRepository } from "./infraestructure/persistence/typeorm/repositories/typeorm-inventory-item.repository";
import { RegisterInventoryItemUseCase } from "./application/use-case/register-inventory-item.use-case";
import { InventoryItemController } from "./presentation/controllers/inventory-item.controller";
import { ViewAllInventoryItemUseCase } from "./application/use-case/view-all-inventory-item.use-case";
import { InventoryModule } from "../inventory/inventory.module";
import { INVENTORY_CHECKER_PORT, InventoryCheckerPort } from "../inventory/domain/port/out/inventory-ckecker.port";

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryItemOrmEntity]),
        InventoryModule
    ],
    providers: [
        {
            provide: INVENTORY_ITEM_REPOSITORY,
            useClass: TypeormInventoryItemRepository
        },
        {
            provide: RegisterInventoryItemUseCase,
            useFactory: (repo: InventoryItemRepository, inventoryCheck: InventoryCheckerPort)=>{
                return new RegisterInventoryItemUseCase(repo, inventoryCheck)
            },
            inject:[INVENTORY_ITEM_REPOSITORY, INVENTORY_CHECKER_PORT]
        },
        {
            provide: ViewAllInventoryItemUseCase,
            useFactory: (repository: InventoryItemRepository)=>{
                return new ViewAllInventoryItemUseCase(repository);
            },
            inject:[INVENTORY_ITEM_REPOSITORY]
        }
    ],
    controllers: [
        InventoryItemController
    ],
    exports: []
})
export class InventoryItemModule{}