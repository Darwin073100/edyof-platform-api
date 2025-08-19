import { TemplateRepository } from "src/shared/domain/repositories/template.repository";
import { InventoryEntity } from "../entities/inventory.entity";

export const INVENTORY_REPOSITORY = Symbol('INVENTORY_REPOSITORY');

export interface InventoryRepository extends TemplateRepository<InventoryEntity> {

}