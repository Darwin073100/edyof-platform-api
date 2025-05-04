export class BaseIdVO{
    private constructor (
        private readonly BaseIdVO: bigint,
    ){}

    public static set(baseIdVO: bigint){
        if (baseIdVO <= 0) {
            throw new Error('El id debe ser un numero positivo.');
        }
        if (!BaseIdVO) {
            throw new Error('El id es requerido.');
        }
        return new BaseIdVO(baseIdVO);
    }
    public get(): bigint{
        return this.BaseIdVO;
    }
}