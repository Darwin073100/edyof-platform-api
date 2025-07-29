import { TemplateRepository } from "src/shared/domain/repositories/template.repository";
import { CustomerEntity } from "../entities/customer.entity";

export interface CustomerRepository extends TemplateRepository<CustomerEntity> {
  findByEmail(email: string):Promise<CustomerEntity| null>;
  findByRfc(rfc: string):Promise<CustomerEntity| null>;
}
  
  // Define el token de inyección para esta interfaz.
  export const CUSTOMER_REPOSITORY = Symbol('CUSTOMER_REPOSITORY');