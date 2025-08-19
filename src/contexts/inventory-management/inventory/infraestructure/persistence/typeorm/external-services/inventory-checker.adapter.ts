import { InventoryCheckerPort } from "src/contexts/inventory-management/inventory/domain/port/out/inventory-ckecker.port";
import { DataSource, Repository } from "typeorm";
import { InventoryOrmEntity } from "../entities/inventory.orm-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InventoryCheckerAdapter implements InventoryCheckerPort{
    private readonly repository: Repository<InventoryOrmEntity>;

    constructor(
        private readonly datasource: DataSource
    ){
        this.repository = this.datasource.getRepository(InventoryOrmEntity); 
    }
    async exist(id: bigint): Promise<boolean> {
        const result = await this.repository.existsBy({inventoryId: id});
        return result;
    }
}