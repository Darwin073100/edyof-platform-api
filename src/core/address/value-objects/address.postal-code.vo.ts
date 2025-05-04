export class AddressPostalCodeVO{
    private constructor (
        private readonly postalCode: number
    ){}

    public static set(postalCode: number){
        if(!postalCode || postalCode.toString().length !== 5){
            throw new Error("El código postal debe tener 5 dígitos.");
        }
        return new AddressPostalCodeVO(postalCode);
    }

    public get(): number{
        return this.postalCode;
    }
 
}