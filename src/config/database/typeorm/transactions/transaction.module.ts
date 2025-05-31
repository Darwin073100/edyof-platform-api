import { Module } from '@nestjs/common';
import { TypeOrmTransaction } from './typeorm.transaction';
import { TransactionContext } from './transaction.context';
import { Transactional } from './transactional.decorator';
import { TRANSACTION_PORT } from 'src/shared/domain/ports/transaction.port';

@Module({
    imports:[],
    providers:[
        TypeOrmTransaction,
        TransactionContext,
        Transactional,
        {
            provide: TRANSACTION_PORT,
            useClass: TypeOrmTransaction
        }
    ],
    exports:[
        TRANSACTION_PORT,
        Transactional,
        TransactionContext
    ]
})
export class TransactionModule {}