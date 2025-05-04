export const TRANSACTION_PORT = 'TRANSACTION_PORT';

export interface TransactionPort {
    run<T>(fn: ()=> Promise<T>): Promise<T>
}