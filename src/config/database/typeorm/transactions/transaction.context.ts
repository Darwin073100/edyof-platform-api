import { Injectable, Scope } from "@nestjs/common";
import { EntityManager } from "typeorm";

@Injectable({scope: Scope.REQUEST})
export class TransactionContext {
    private entityManager: EntityManager;

    setManager(manager: EntityManager){
        this.entityManager = manager;
    }

    getManager(): EntityManager{
        if(!this.entityManager){
            throw new Error('EntityManager no esta instanciado');
        }
        return this.entityManager;
    }

    hasManager(): boolean{
        return !!this.entityManager;
    }

}