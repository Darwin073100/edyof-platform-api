import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { TransactionContext } from "./transaction.context";
import { TransactionPort } from "src/shared/domain/ports/transaction.port";

@Injectable()
export class TypeOrmTransaction implements TransactionPort{
    constructor(
        private readonly dataSource: DataSource,
        private readonly transactionContext: TransactionContext,
    ){}

    async run<T>(callback: ()=> Promise<T>):Promise<T>{
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction(); // Inicio de la transacción

        this.transactionContext.setManager(queryRunner.manager); 

        try {
            const result = await callback();
            await queryRunner.commitTransaction(); // Si todo va bien, se realiza el commit
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction(); // Si hay errores, se hace un rollback
            throw error; // Se lanza el error optenido para que nestjs lo maneje
        } finally{
            await queryRunner.release(); // Se cierra la conexión
        }
    }
}