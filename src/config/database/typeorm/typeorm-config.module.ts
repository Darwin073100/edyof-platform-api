import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EstablishmentOrmEntity } from 'src/contexts/educational-center-management/educational-center/infraestruture/persistence/typeorm/entities/establishment-orm-entity';
import { BranchOfficeOrmEntity } from 'src/contexts/educational-center-management/branch-office/infraestructure/persistence/typeorm/entities/branch-office.orm-entity';
import { AddressOrmEntity } from 'src/shared/infraestructure/typeorm/address.orm-entity';

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
            AddressOrmEntity
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