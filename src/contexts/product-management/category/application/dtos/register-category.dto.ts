export class RegisterCategoryDto{
    readonly name: string;
    readonly description?: string|null;
    constructor(
        name: string,
        description?: string|null
    ){
        this.name = name;
        this.description = description;
    }
}