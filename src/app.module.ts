/**
 * Módulo raíz de la aplicación. Importa y agrupa todos los módulos principales.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './config/database/typeorm/typeorm-config.module';
import { EstablishmentModule } from './contexts/establishment-management/establishment/establishment.module';
import { BranchOfficeModule } from './contexts/establishment-management/branch-office/branch-office.module';
import { CategoryModule } from './contexts/product-management/category/category.module';
import { BrandModule } from './contexts/product-management/brand/brand.module';
import { SeasonModule } from './contexts/product-management/season/season.module';
import { AuthModule } from './contexts/authentication-management/auth/auth.module';
import { RoleModule } from './contexts/authentication-management/role/role.module';
import { ProductModule } from './contexts/product-management/product/product.module';
import { SuplierModule } from './contexts/purchase-management/suplier/suplier.module';
import { LotModule } from './contexts/purchase-management/lot/lot.module';
import { EmployeeRoleModule } from './contexts/employee-management/employee-role/employee-role.module';
import { EmployeeModule } from './contexts/employee-management/employee/employee.module';
import { InventoryItemModule } from './contexts/inventory-management/inventory-item/inventory-item.module';

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
    AuthModule,
    RoleModule,
    ProductModule,
    SuplierModule,
    LotModule,
    EmployeeRoleModule,
    EmployeeModule,
    InventoryItemModule
  ],
})
export class AppModule {}
