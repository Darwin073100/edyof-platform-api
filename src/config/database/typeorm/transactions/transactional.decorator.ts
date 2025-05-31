import { Inject, Injectable } from "@nestjs/common";
import { TransactionContext } from "./transaction.context";
import { EntityManager } from "typeorm";

@Injectable()
export class Transactional {
    constructor(
        @Inject(TransactionContext)
        private readonly transactionContext: TransactionContext,
    ){}

    getManager(): EntityManager {
        if(this.transactionContext.hasManager()){
            return this.transactionContext.getManager();
        }
        throw new Error('No está activa la transacción');
    }
}