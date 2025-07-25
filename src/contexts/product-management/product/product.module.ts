import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from './infraestructure/persistence/typeorm/entities/product.orm-entity';
import { ProductController } from './presentation/http/controllers/product.controller';
import { RegisterProductUseCase } from './application/use-cases/register-product.use-case';
import { TypeOrmProductRepository } from './infraestructure/persistence/typeorm/repositories/typeorm-product.repository';
import { PRODUCT_REPOSITORY, ProductRepository } from './domain/repositories/product.repository';
import { EstablishmentModule } from 'src/contexts/establishment-management/establishment/establishment.module';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { SeasonModule } from '../season/season.module';
import { CATEGORY_CHECKER_PORT, CategoryCheckerPort } from '../category/domain/ports/out/category-checker.port';
import { BRAND_CHECKER_PORT, BrandChekerPort } from '../brand/domain/ports/out/brand-checker.port';
import { SEASON_CHECKER_PORT, SeasonCheckerPort } from '../season/domain/ports/out/season-checker.port';
import { ESTABLISHMENT_CHECKER_PORT, EstablishmentCheckerPort } from 'src/contexts/establishment-management/establishment/application/ports/out/establishment-checker.port';
import { PRODUCT_CHECKER_PORT } from './domain/ports/out/product-checker.port';
import { ProductCheckerAdapter } from './infraestructure/persistence/typeorm/external-services/product-checker.adapter';
import { ViewAllProductsUseCase } from './application/use-cases/view-all-products.use-case';
import { RegisterProductWithLotAndInventoryItemUseCase } from './application/use-cases/register-product-with-lot-and-inventory-item.use-case';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductOrmEntity]),
        EstablishmentModule,
        BrandModule,
        CategoryModule,
        SeasonModule,
    ],
    controllers: [ProductController],
    providers: [
        {
            provide: PRODUCT_REPOSITORY,
            useClass: TypeOrmProductRepository,
        },
        {
            provide: PRODUCT_CHECKER_PORT,
            useClass: ProductCheckerAdapter
        },
        {
            provide: ViewAllProductsUseCase,
            useFactory: (repo: ProductRepository) => {
                return new ViewAllProductsUseCase(repo);
            },
            inject: [PRODUCT_REPOSITORY],
        },
        {
            provide: RegisterProductUseCase,
            useFactory: (
                repo: ProductRepository, 
                checkerCat: CategoryCheckerPort, 
                checkerBrand: BrandChekerPort, 
                checkerSeas: SeasonCheckerPort, 
                checkerEst: EstablishmentCheckerPort,
            ) => {
                return new RegisterProductUseCase(repo, checkerCat, checkerBrand, checkerSeas, checkerEst);
            },
            inject: [
                PRODUCT_REPOSITORY, 
                CATEGORY_CHECKER_PORT,
                BRAND_CHECKER_PORT,
                SEASON_CHECKER_PORT,
                ESTABLISHMENT_CHECKER_PORT
            ],
        },
        {
            provide: RegisterProductWithLotAndInventoryItemUseCase,
            useFactory: (
                repo: ProductRepository, 
                checkerCat: CategoryCheckerPort, 
                checkerBrand: BrandChekerPort, 
                checkerSeas: SeasonCheckerPort, 
                checkerEst: EstablishmentCheckerPort,
            ) => {
                return new RegisterProductWithLotAndInventoryItemUseCase(repo, checkerCat, checkerBrand, checkerSeas, checkerEst);
            },
            inject: [
                PRODUCT_REPOSITORY, 
                CATEGORY_CHECKER_PORT,
                BRAND_CHECKER_PORT,
                SEASON_CHECKER_PORT,
                ESTABLISHMENT_CHECKER_PORT
            ],
        },
    ],
    exports: [
        PRODUCT_CHECKER_PORT
    ]
})
export class ProductModule { }
