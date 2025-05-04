import { Inject, Injectable } from "@nestjs/common";
import { AddressEntity } from "../../domain/entities/address.entity";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../domain/repositories/address.repository";

@Injectable()
export class AddressService{
    constructor(
        @Inject(ADDRESS_REPOSITORY)
        private readonly addressRepositoy: AddressRepository,
    ){}

    async saveNewAddress(entity: AddressEntity) {
        const result = this.addressRepositoy.save(entity);
        return result;
    }
    
}