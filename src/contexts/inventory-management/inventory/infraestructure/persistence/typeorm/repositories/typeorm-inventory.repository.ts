import { InventoryEntity } from "src/contexts/inventory-management/inventory/domain/entities/inventory.entity";
import { InventoryRepository } from "src/contexts/inventory-management/inventory/domain/repositories/inventory.repository";
import { DataSource, Repository } from "typeorm";
import { InventoryOrmEntity } from "../entities/inventory.orm-entity";
import { Injectable } from "@nestjs/common";
import { InventoryMapper } from "../mapper/inventory.mapper";

@Injectable()
export class TypeormInventoryRepository implements InventoryRepository{
    private readonly inventoryRepository: Repository<InventoryOrmEntity>;

    constructor(private readonly datasource: DataSource){
        this.inventoryRepository = this.datasource.getRepository(InventoryOrmEntity);
    }

    async save(entity: InventoryEntity): Promise<InventoryEntity> {
        const ormEntity = InventoryMapper.toOrmEntity(entity);
        const result = await this.inventoryRepository.save(ormEntity);
        return InventoryMapper.toDomain(result);
    }
    
    async findById(entityId: bigint): Promise<InventoryEntity | null> {
        const result = await this.inventoryRepository.findOne({ 
            where: { inventoryId: entityId },
            relations:['product','product.category','lot'] 
        });
        return result ? InventoryMapper.toDomain(result) : null;
    }

    async findAll(): Promise<[] | InventoryEntity[]> {
        const result = await this.inventoryRepository.find({
            relations: ['product','product.category','lot']
        });
        
        if(result.length === 0) return [];

        const items = result.map(item=> InventoryMapper.toDomain(item));

        return items;

    }
    delete(entityId: bigint): Promise<InventoryEntity | null> {
        throw new Error("Method not implemented.");
    }
    
}