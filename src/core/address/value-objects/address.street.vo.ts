export class AddressStreetVO {
    private constructor(
        private readonly street: string
    ) {}

    public static set(street: string) {
        if (!street || street.length < 3) {
            throw new Error("La calle debe ser mayor a 3 caracteres.");
        }
        return new AddressStreetVO(street);
    }

    public get(): string {
        return this.street;
    }
} 