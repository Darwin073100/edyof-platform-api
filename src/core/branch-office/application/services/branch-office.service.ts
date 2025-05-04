import { Inject, Injectable } from "@nestjs/common";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";
import { BRANCH_OFFICE_REPOSITORY, BranchOfficeRepository } from "../../domain/repository/branch-office.repository";

@Injectable()
export class BranchOfficeService{
    constructor(
        @Inject(BRANCH_OFFICE_REPOSITORY)
        private readonly branchOfficeRepository: BranchOfficeRepository,
    ){}

    async saveNewBranchOffice( entity: BranchOfficeEntity){
        const result = await this.branchOfficeRepository.save( entity );
        return result; 
    }
    
}