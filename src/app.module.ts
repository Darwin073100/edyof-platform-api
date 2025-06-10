import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './config/database/typeorm/typeorm-config.module';
import { EstablishmentModule } from './contexts/establishment-management/establishment/establishment.module';
import { BranchOfficeModule } from './contexts/establishment-management/branch-office/branch-office.module';
import { CategoryModule } from './contexts/product-management/category/category.module';
import { BrandModule } from './contexts/product-management/brand/brand.module';
import { SeasonModule } from './contexts/product-management/season/season.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeormConfigModule,
    EstablishmentModule,
    BranchOfficeModule,
    CategoryModule,
    BrandModule,
    SeasonModule,
  ],
})
export class AppModule {}
