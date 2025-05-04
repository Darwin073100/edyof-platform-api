import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { BranchOfficeRepository } from "src/core/branch-office/domain/repository/branch-office.repository";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";
import { BranchOfficeMapper } from "../mappers/branch-office.mapper";
import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";
import { Injectable } from "@nestjs/common";
import { BranchOfficeSchema } from "../schemas/branch-office.schema";

@Injectable()
export class BranchOfficeRepositoryImpl implements BranchOfficeRepository {
    constructor(
        // @InjectRepository(BranchSchema)
        // private readonly branchRepository: Repository<BranchSchema>,
        private readonly transactional: Transactional,
    ){}
    update(entity: BranchOfficeEntity): Promise<BranchOfficeEntity> {
        throw new Error("Method not implemented.");
    }
    async save(entity: BranchOfficeEntity): Promise<BranchOfficeEntity> {
        try {
            const manager = this.transactional.getManager();
            const transactionRepository = manager.getRepository(BranchOfficeSchema);

            const branchOfficeSchema = BranchOfficeMapper.toPersistence(entity);

            const result = await transactionRepository.save(branchOfficeSchema);

            return BranchOfficeMapper.toDomain(result);
        } catch (error) {
            return handlerExceptionError(error);
        }
    }
    findAll(): Promise<BranchOfficeEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<BranchOfficeEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}