import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EstablishmentOrmEntity } from 'src/contexts/establishment-management/establishment/infraestruture/persistence/typeorm/entities/establishment-orm-entity';
import { BranchOfficeOrmEntity } from 'src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import { AddressOrmEntity } from 'src/shared/infraestructure/typeorm/address.orm-entity';
import { CategoryOrmEntity } from 'src/contexts/product-management/category/infraestructure/persistence/typeorm/entities/category.orm-entity';
import { BrandOrmEntity } from 'src/contexts/product-management/brand/infraestruture/persistence/typeorm/entities/brand-orm-entity';
import { SeasonOrmEntity } from 'src/contexts/product-management/season/infraestructure/persistence/typeorm/entities/season.orm-entity';
import { UserOrmEntity } from 'src/contexts/authentication-management/auth/infraestructure/entities/user.orm-entity';
import { RoleOrmEntity } from 'src/contexts/authentication-management/role/infraestructure/persistence/typeorm/entities/role.orm-entity';
import { UserRoleOrmEntity } from 'src/contexts/authentication-management/auth/infraestructure/entities/user-role.orm-entity';
import { PermissionOrmEntity } from 'src/contexts/authentication-management/permission/infraestructure/persistence/typeorm/entities/permission.orm-entity';
import { RolePermissionOrmEntity } from 'src/contexts/authentication-management/role/infraestructure/persistence/typeorm/entities/role-permission.orm-entity';
import { ProductOrmEntity } from 'src/contexts/product-management/product/infraestructure/persistence/typeorm/entities/product.orm-entity';
import { SuplierOrmEntity } from 'src/contexts/purchase-management/suplier/infraestructure/persistence/typeorm/entities/suplier.orm-entity';
import { LotOrmEntity } from 'src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/entities/lot.orm-entity';
import { EmployeeRoleOrmEntity } from 'src/contexts/employee-management/employee-role/infraestruture/persistence/typeorm/entities/employee-role-orm-entity';
import { EmployeeOrmEntity } from 'src/contexts/employee-management/employee/infraestruture/persistence/typeorm/entities/employee-orm-entity';
import { InventoryOrmEntity } from 'src/contexts/inventory-management/inventory/infraestructure/persistence/typeorm/entities/inventory.orm-entity';
import { CustomerOrmEntity } from 'src/contexts/sale-management/customer/infraestructure/persistence/typeorm/entities/customer.orm-entity';
import { LotUnitPurchaseOrmEntity } from 'src/contexts/purchase-management/lot/infraestructura/persistence/typeorm/entities/lot-unit-purchase.orm-entity';
import { InventoryItemOrmEntity } from 'src/contexts/inventory-management/inventory-item/infraestructure/persistence/typeorm/entities/inventory-item.orm-entity';

@Module({
    imports: [
        ConfigModule, // <-- Asegura que ConfigService esté disponible
        TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          // entities: [`${__dirname}/../../../**/*.schema.{ts,js}`],
          entities: [
            EstablishmentOrmEntity,
            BranchOfficeOrmEntity,
            AddressOrmEntity,
            CategoryOrmEntity,
            BrandOrmEntity,
            SeasonOrmEntity,
            UserOrmEntity,
            RoleOrmEntity,
            UserRoleOrmEntity,
            PermissionOrmEntity,
            RolePermissionOrmEntity,
            ProductOrmEntity,
            SuplierOrmEntity,
            LotOrmEntity,
            EmployeeRoleOrmEntity,
            EmployeeOrmEntity,
            InventoryOrmEntity,
            InventoryItemOrmEntity,
            CustomerOrmEntity,
            LotUnitPurchaseOrmEntity
          ],
          synchronize: false,
          ...(isProduction && {
            ssl: {
              rejectUnauthorized: false,
            },
          }),
        };
      },
    }),
    ],
})
export class TypeormConfigModule {}