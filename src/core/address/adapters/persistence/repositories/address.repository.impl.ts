import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { AddressRepository } from "src/core/address/domain/repositories/address.repository";
import { AddressMapper } from "../mappers/address.mapper";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";
import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";
import { Injectable } from "@nestjs/common";
import { AddressSchema } from "../schemas/address.schema";

@Injectable()
export class AddressRepositoryImpl implements AddressRepository{
    constructor(
        // @InjectRepository(AddressSchema)
        // private readonly addressRepository: Repository<AddressSchema>,
        private readonly transactional: Transactional,
    ){}
    update(entity: AddressEntity): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    }
    async save(entity: AddressEntity): Promise<AddressEntity> {
        try {
            const manager = this.transactional.getManager();
            const transactionRepository = manager.getRepository(AddressSchema);

            const schema = AddressMapper.toPersistence(entity);

            const result = await transactionRepository.save(schema);

            return AddressMapper.toDomain(result);
        } catch (error) {
            return handlerExceptionError(error);
        }
    }
    findAll(): Promise<AddressEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}