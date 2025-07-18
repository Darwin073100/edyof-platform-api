import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryOrmEntity } from './infraestructure/persistence/typeorm/entities/category.orm-entity';
import { CategoryController } from './presentation/controllers/category.controller';
import { RegisterCategoryUseCase } from './application/use-cases/register-category.use-case';
import { CATEGORY_REPOSITORY, CategoryRepository } from './domain/repositories/category.repository';
import { TypeormCategoryRepository } from './infraestructure/persistence/typeorm/repositories/typeorm-category.repository';
import { CATEGORY_CHECKER_PORT } from './domain/ports/out/category-checker.port';
import { TypeormCategoryCheckerAdapter } from './infraestructure/persistence/typeorm/external-services/typeorm-category-checker.adapter';
import { ViewAllCategoriesUseCase } from './application/use-cases/view-all-categories.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryOrmEntity])],
  controllers: [CategoryController],
  providers: [
    {
        provide: CATEGORY_REPOSITORY,
        useClass: TypeormCategoryRepository
    },
    {
      provide: CATEGORY_CHECKER_PORT,
      useClass: TypeormCategoryCheckerAdapter
    },
    {
      provide: RegisterCategoryUseCase, // Provee el caso de uso
      useFactory: (repo: CategoryRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new RegisterCategoryUseCase(repo);
      },
      inject: [
        CATEGORY_REPOSITORY
      ], // Declara la dependencia para el factory
    },
    {
      provide: ViewAllCategoriesUseCase,
      useFactory: (repository: CategoryRepository)=>{
        return new ViewAllCategoriesUseCase(repository);
      },
      inject: [CATEGORY_REPOSITORY]
    }
  ],
  exports: [
    CATEGORY_CHECKER_PORT
  ]
})
export class CategoryModule {}
