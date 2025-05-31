import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { EstablishmentOrmEntity } from 'src/contexts/educational-center-management/educational-center/infraestruture/persistence/typeorm/entities/establishment-orm-entity';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // entities: [`${__dirname}/../../../core/**/*.schema.{ts,js}`],
  entities:[EstablishmentOrmEntity],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  synchronize: false,
  migrationsTableName: 'migrations',
});

export default AppDataSource;