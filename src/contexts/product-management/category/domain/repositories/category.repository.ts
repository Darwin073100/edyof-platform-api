import { CategoryEntity } from "../entities/category-entity";

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');

export interface CategoryRepository{
    save(entity: CategoryEntity): Promise<CategoryEntity>;
    findById(categoryId: bigint): Promise<CategoryEntity | null>;
    findAll(): Promise<CategoryEntity[]>;
}