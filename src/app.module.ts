import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './config/database/typeorm/typeorm-config.module';
import { EstablishmentModule } from './contexts/educational-center-management/educational-center/establishment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeormConfigModule,
    EstablishmentModule,
  ],
})
export class AppModule {}
