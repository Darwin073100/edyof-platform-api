import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { EstablishmentOrmEntity } from 'src/contexts/establishment-management/establishment/infraestruture/persistence/typeorm/entities/establishment-orm-entity';
import { BranchOfficeOrmEntity } from 'src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import { AddressOrmEntity } from 'src/shared/infraestructure/typeorm/address.orm-entity';
import { CategoryOrmEntity } from 'src/contexts/product-management/category/infraestructure/persistence/typeorm/entities/category.orm-entity';
import { BrandOrmEntity } from 'src/contexts/product-management/brand/infraestruture/persistence/typeorm/entities/brand-orm-entity';
import { SeasonOrmEntity } from 'src/contexts/product-management/season/infraestructure/persistence/typeorm/entities/season.orm-entity';
import { UserOrmEntity } from 'src/contexts/authentication-management/auth/infraestructure/entities/user.orm-entity';
import { RoleOrmEntity } from 'src/contexts/authentication-management/role/infraestructure/persistence/typeorm/entities/role.orm-entity';
import { UserRoleOrmEntity } from 'src/contexts/authentication-management/auth/infraestructure/entities/user-role.orm-entity';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // entities: [`${__dirname}/../../../core/**/*.schema.{ts,js}`],
  entities:[
    EstablishmentOrmEntity,
    AddressOrmEntity,
    BranchOfficeOrmEntity,
    CategoryOrmEntity,
    BrandOrmEntity,
    SeasonOrmEntity,
    UserOrmEntity,
    RoleOrmEntity,
    UserRoleOrmEntity
  ],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  synchronize: false,
  migrationsTableName: 'migrations',
});

export default AppDataSource;