import { EstablishmentEntity } from "../../domain/entities/establishment.entity";

export function viewAllEstablishmentPresenter(entities: EstablishmentEntity[]){
    return {
        establishments: entities
    }
}