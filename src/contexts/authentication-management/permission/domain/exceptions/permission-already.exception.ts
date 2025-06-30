import { DomainException } from "src/shared/domain/exceptions/domain.exceptions";

export class PermissionAlreadyExistException extends DomainException {
    constructor(message: string){
        super(message);
    }
}