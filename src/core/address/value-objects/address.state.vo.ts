export class AddressStateVO{
    private constructor (
        private readonly state: string
    ){}

    public static set(state: string){
        if(!state || state.length < 2) throw new Error('El estado debe tener mas 2 caracteres')
        return new AddressStateVO(state)
    }

    public get(){
        return this.state
    }

}