import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infraestructure/database/typeorm/typeorm-config.module';
import { TransactionModule } from './infraestructure/database/typeorm/transactions/transaction.module';
import { BranchOfficeModule } from './core/branch-office/branch-office.module';
import { AddressModule } from './core/address/address.module';
import { EstablishmentModule } from './core/establishment/adapters/establishment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './infraestructure/events/event.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    TypeormConfigModule,
    EventModule,
    BranchOfficeModule,
    AddressModule,
    TransactionModule,
    EstablishmentModule,
  ],
})
export class AppModule {}
