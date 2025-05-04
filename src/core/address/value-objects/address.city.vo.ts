export class AddressCityVO {
    private constructor(
        private readonly city: string
    ) {}

    public static set(city: string) {
        if (!city || city.length < 2) {
            throw new Error("La ciudad debe tener más de 2 caracteres.");
        }
        return new AddressCityVO(city);
    }

    public get(): string {
        return this.city;
    }
}