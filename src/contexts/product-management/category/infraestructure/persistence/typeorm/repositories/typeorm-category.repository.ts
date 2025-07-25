import { CategoryEntity } from "src/contexts/product-management/category/domain/entities/category-entity";
import { CategoryRepository } from "src/contexts/product-management/category/domain/repositories/category.repository";
import { QueryFailedError, Repository } from "typeorm";
import { CategoryOrmEntity } from "../entities/category.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryMapper } from "../mappers/category.mapper";
import { CategoryAlreadyExistsException } from "src/contexts/product-management/category/domain/exceptions/category-already-exists.exception";

export class TypeormCategoryRepository implements CategoryRepository{
    private readonly typeormRepository: Repository<CategoryOrmEntity>;
    constructor(
        @InjectRepository(CategoryOrmEntity)
        typeormRepository: Repository<CategoryOrmEntity>,
    ){
        this.typeormRepository = typeormRepository;
    }
    async findById(categoryId: bigint): Promise<CategoryEntity | null> {
        const ormEntity = await this.typeormRepository.findOne({
            where: {categoryId: categoryId},
        });
        if (!ormEntity) {
            return Promise.resolve(null);
        }
        return CategoryMapper.toDomainEntity(ormEntity);
    }

    async findAll(): Promise<CategoryEntity[]> {
        const result = await this.typeormRepository.find({});
        const categoryList = result.map(item => CategoryMapper.toDomainEntity(item));
        return categoryList;
    }

    async save(entity: CategoryEntity): Promise<CategoryEntity> {
        try {
            let ormEntity = await this.typeormRepository.findOne({
                where: {categoryId: entity.categoryId},
            });

            if(ormEntity){
                ormEntity.name = entity.name.name;
                ormEntity.description = entity.description?.description;
                ormEntity.updatedAt = entity.updatedAt;
                ormEntity.deletedAt = entity.deletedAt;
            } else {
                ormEntity = CategoryMapper.toTypeOrmEntity(entity);
            }

            const savedOrmEntity = await this.typeormRepository.save(ormEntity);

            return CategoryMapper.toDomainEntity(savedOrmEntity);
        } catch (error) {
            if(error instanceof QueryFailedError){
                const pgError = error as any;
                if(pgError.code === '23505'){
                    throw new CategoryAlreadyExistsException('Ya existe una categoría con ese nombre.');
                }
            }
            throw error;
        }
    }
}