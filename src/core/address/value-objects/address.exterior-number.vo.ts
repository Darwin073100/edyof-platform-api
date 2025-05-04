export class AddressExteriorNumberVO {
    private constructor(
        private readonly interiorNumber: string
    ) {}

    public static set(interiorNumber: string) {
        if (!interiorNumber || interiorNumber.length < 1) {
            throw new Error("El número exterior debe ser mayor a 1 dígito.");
        }
        return new AddressExteriorNumberVO(interiorNumber);
    }

    public get(): string {
        return this.interiorNumber;
    }
}