export interface TemplateRepository<T>{
    save(entity: T): Promise<T>;
    findById(entityId: bigint): Promise<T | null>;
    findAll(): Promise<T[] | []>;
    delete(entityId: bigint): Promise<T | null>;
}