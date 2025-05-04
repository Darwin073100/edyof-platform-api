export interface BaseRepository<T>{
    save(entity: T): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    delete(id: string):Promise<void>;
    update(entity: T): Promise<T>;
}