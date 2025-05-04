import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { BaseEntity } from "src/core/shared/domain/base.entity";
import { EstablishmentNameVO } from "../../value-objects/establishment.name.vo";

export class EstablishmentEntity extends BaseEntity{
    establishmentId?: bigint;
    name: EstablishmentNameVO;
    branchOffices?: BranchOfficeEntity[];
}