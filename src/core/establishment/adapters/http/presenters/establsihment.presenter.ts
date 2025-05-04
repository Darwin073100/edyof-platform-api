import { EstablishmentEntity } from "src/core/establishment/domain/entities/establishment.entity";

export class EstablishmentPresenter {
    static toHttp(establishment: EstablishmentEntity){
        return {
            ...establishment,
            name: establishment.name.get()
        }
    }

    static toHttpList(establsihments: EstablishmentEntity[]){
        return {
            establishments: establsihments.map(item => this.toHttp(item))
        };
    }
}