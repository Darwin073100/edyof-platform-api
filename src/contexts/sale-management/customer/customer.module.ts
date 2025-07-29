import { Module } from "@nestjs/common";
import { CustomerController } from "./presentation/controllers/customer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerOrmEntity } from "./infraestructure/persistence/typeorm/entities/customer.orm-entity";
import { TypeOrmCustomerRepository } from "./infraestructure/persistence/typeorm/repositories/typeorm-customer.repository";
import { RegisterCustomerUseCase } from "./application/use-cases/register-customer.use-case";
import { CUSTOMER_REPOSITORY, CustomerRepository } from "./domain/repositories/customer.repository";

@Module({
    imports: [
      // Importa las entidades de TypeORM que este módulo utilizará.
      // Esto es crucial para que TypeORM sepa qué tablas debe gestionar.
      TypeOrmModule.forFeature([CustomerOrmEntity]),
    ],
    controllers: [
      // Los controladores que manejan las solicitudes HTTP para este módulo.
      CustomerController,
    ],
    providers: [
      {
        provide: CUSTOMER_REPOSITORY, // El "token" o la "interfaz" que se pide
        useClass: TypeOrmCustomerRepository, // La clase concreta que se provee
      },
      {
        provide: RegisterCustomerUseCase, // Provee el caso de uso
        useFactory: (repo1: CustomerRepository) => {
          // NestJS inyecta el repo aquí basado en el token
          return new RegisterCustomerUseCase(repo1);
        },
        inject: [CUSTOMER_REPOSITORY], // Declara la dependencia para el factory
      }
    ],
    exports: [
      RegisterCustomerUseCase,
    ],
  })
  export class CustomerModule {}
  