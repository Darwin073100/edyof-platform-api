import { DataSource, Repository } from "typeorm";
import { InventoryItemOrmEntity } from "../entities/inventory-item.orm-entity";
import { Injectable } from "@nestjs/common";
import { InventoryItemMapper } from "../mapper/inventory-item.mapper";
import { InventoryItemEntity } from "src/contexts/inventory-management/inventory-item/domain/entities/inventory-item.entity";
import { InventoryItemRepository } from "src/contexts/inventory-management/inventory-item/domain/repositories/inventory-item.repository";

@Injectable()
export class TypeormInventoryItemRepository implements InventoryItemRepository{
    private readonly inventoryItemRepository: Repository<InventoryItemOrmEntity>;

    constructor(private readonly datasource: DataSource){
        this.inventoryItemRepository = this.datasource.getRepository(InventoryItemOrmEntity);
    }

    async save(entity: InventoryItemEntity): Promise<InventoryItemEntity> {
        const ormEntity = InventoryItemMapper.toOrmEntity(entity);
        const result = await this.inventoryItemRepository.save(ormEntity);
        return InventoryItemMapper.toDomain(result);
    }
    
    async findById(entityId: bigint): Promise<InventoryItemEntity | null> {
        const result = await this.inventoryItemRepository.findOne({ 
            where: { inventoryItemId: entityId },
            relations:['product','product.category','lot'] 
        });
        return result ? InventoryItemMapper.toDomain(result) : null;
    }

    async findAll(): Promise<[] | InventoryItemEntity[]> {
        const result = await this.inventoryItemRepository.find({
            relations: ['product','product.category','lot']
        });
        
        if(result.length === 0) return [];

        const items = result.map(item=> InventoryItemMapper.toDomain(item));

        return items;

    }
    delete(entityId: bigint): Promise<InventoryItemEntity | null> {
        throw new Error("Method not implemented.");
    }
    
}