import { CustomerEntity } from "../../domain/entities/customer.entity";
import { CustomerResponseDto } from "../dtos/customer-response.dto";

export class CustomerMapper {
    public static toResponseDto(entity: CustomerEntity): CustomerResponseDto {
      return new CustomerResponseDto(
        entity.customerId,
        entity.createdAt,
        entity.firstName.value,
        entity.lastName?.value,
        entity.companyName?.value,
        entity.addressId,
        entity?.phoneNumber?.value,
        entity.address?{
          street: entity.address.street,
          externalNumber: entity.address.externalNumber,
          internalNumber: entity.address.internalNumber,
          municipality: entity.address.municipality,
          neighborhood: entity.address.neighborhood,
          city: entity.address.city,
          state: entity.address.state,
          postalCode: entity.address.postalCode,
          country: entity.address.country,
          reference: entity.address.reference
        }: undefined,
        entity.rfc?.value,
        entity.email?.value,
        entity.customerType?.value,
        entity.updatedAt,
        entity.deletedAt,
      );
    }
}