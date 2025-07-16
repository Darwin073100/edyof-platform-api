import { TemplateRepository } from "src/shared/domain/repositories/template.repository";
import { InventoryItemEntity } from "../entities/inventory-item.entity";

export const INVENTORY_ITEM_REPOSITORY = Symbol('INVENTORY_ITEM_REPOSITORY');

export interface InventoryItemRepository extends TemplateRepository<InventoryItemEntity> {

}