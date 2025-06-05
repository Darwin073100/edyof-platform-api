import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EstablishmentOrmEntity } from 'src/contexts/establishment-management/establishment/infraestruture/persistence/typeorm/entities/establishment-orm-entity';
import { BranchOfficeOrmEntity } from 'src/contexts/establishment-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import { AddressOrmEntity } from 'src/shared/infraestructure/typeorm/address.orm-entity';
import { CategoryOrmEntity } from 'src/contexts/product-management/category/infraestructure/persistence/typeorm/entities/category.orm-entity';
import { BrandOrmEntity } from 'src/contexts/product-management/brand/infraestruture/persistence/typeorm/entities/brand-orm-entity';

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
            BrandOrmEntity
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