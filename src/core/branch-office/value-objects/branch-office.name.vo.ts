export class BranchOfficeNameVO{
    private constructor(
        private readonly name: string
    ){}

    public static set(name: string){
        if(!name || name.length < 2 || name.length > 100){
            throw new Error("El nombre de la sucursal debe tener entre 3 y 100 caracteres.");
        }
        return new BranchOfficeNameVO(name);
    }

    public get(): string{
        return this.name;
    }
}