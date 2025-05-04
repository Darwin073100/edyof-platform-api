import { ConflictException } from "@nestjs/common";

export class EstablishmentNameVO{
    private constructor(
        private readonly name: string
    ){}

    public static set(name: string){
        if(!name || name.length < 2 || name.length > 100){
            throw new ConflictException("El nombre del establecimeinto debe tener entre 3 y 100 caracteres.");
        }
        return new EstablishmentNameVO(name);
    }

    public get(): string{
        return this.name;
    }
}