import { BaseRepository } from "src/core/shared/domain/ports/base.repository";
import { BranchOfficeEntity } from "../entities/branch-office.entity";

export const BRANCH_OFFICE_REPOSITORY = 'BRANCH_OFFICE_REPOSITORY';

export interface BranchOfficeRepository extends BaseRepository<BranchOfficeEntity> {

}