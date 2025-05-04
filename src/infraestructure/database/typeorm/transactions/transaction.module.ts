import { Module } from '@nestjs/common';
import { TRANSACTION_PORT } from 'src/shared/ports/transaction.port';
import { TypeOrmTransaction } from './typeorm.transaction';
import { TransactionContext } from './transaction.context';
import { Transactional } from './transactional.decorator';

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