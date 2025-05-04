import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EstablishmentEntity } from "src/core/establishment/domain/entities/establishment.entity";
import { EstablishmentRepository } from "src/core/establishment/domain/repositories/establishment.repository";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";
import { EstablishmentMapper } from "../mappers/establishment.mapper";
import { EstablishmentSchema } from "../schemas/establishment.schema";
// import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";

Injectable()
export class EstablishmentRepositoryImpl implements EstablishmentRepository{
    constructor(
        @InjectRepository(EstablishmentSchema)
        private readonly establishmentRepository: Repository<EstablishmentSchema>
    ){}
    
    async save(entity: EstablishmentEntity): Promise<EstablishmentEntity> {
        try{
            const schema = EstablishmentMapper.toPersistence(entity);
            
            const result = await this.establishmentRepository.save(schema);
            
            return EstablishmentMapper.toDomain(result);
        } catch(error){
            return handlerExceptionError(error);
        }
    }
    async findAll(): Promise<EstablishmentEntity[]> {
        try{
            const result = await this.establishmentRepository.find();
            return result.map(EstablishmentMapper.toDomain);
        } catch(error){
            return handlerExceptionError(error);
        }
    }
    findById(id: string): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: EstablishmentEntity): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    }

}