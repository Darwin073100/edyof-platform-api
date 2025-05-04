export class AddressInteriorNumberVO {
    private constructor(
        private readonly interiorNumber: string
    ) {}

    public static set(interiorNumber: string) {
        if (!interiorNumber || interiorNumber.length < 1) {
            throw new Error("El número interior debe ser mayor a 1 dígito.");
        }
        return new AddressInteriorNumberVO(interiorNumber);
    }

    public get(): string {
        return this.interiorNumber;
    }
}