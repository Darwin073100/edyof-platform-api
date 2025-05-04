import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseSchema{
    @Column({name: 'is_active', default: true, nullable: false})
    isActive?: boolean;
    @Column({name: 'created_at', type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt?: Date;
    @Column({name: 'updated_at', type: 'timestamp', default: null,  onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt?: Date;
}