import { CategoryEntity } from "../../domain/entities/category-entity";
import { CategoryNotFoundException } from "../../domain/exceptions/category-not-found.exception";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { CategoryDescriptionVO } from "../../domain/value-objects/category-description.vo";
import { CategoryNameVO } from "../../domain/value-objects/category-name.vo";
import { UpdateCategoryDTO } from "../dtos/update-category.dto";

export class UpdatedCategoryUseCase {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async execute(command: UpdateCategoryDTO): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findById(command.categoryId);
        if (!category) {
            throw new CategoryNotFoundException('Categoría no encontrada');
        }

        category.updateName(CategoryNameVO.create(command.name));
        command.description ? category.updateDescription(CategoryDescriptionVO.create(command.description)) : null;

        return this.categoryRepository.save(category);
    }
}