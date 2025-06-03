import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { EstablishmentOrmEntity } from 'src/contexts/educational-center-management/educational-center/infraestruture/persistence/typeorm/entities/establishment-orm-entity';
import { BranchOfficeOrmEntity } from 'src/contexts/educational-center-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import { AddressOrmEntity } from 'src/shared/infraestructure/typeorm/address.orm-entity';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // entities: [`${__dirname}/../../../core/**/*.schema.{ts,js}`],
  entities:[
    EstablishmentOrmEntity,
    AddressOrmEntity,
    BranchOfficeOrmEntity,
  ],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  synchronize: false,
  migrationsTableName: 'migrations',
});

export default AppDataSource;