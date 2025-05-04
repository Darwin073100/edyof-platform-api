export class AddressDistrictVO {
    private constructor(
        private readonly district: string
    ) {}

    public static set(district: string) {
        if (!district || district.length < 2) {
            throw new Error("El distrito debe tener más de 2 caracteres.");
        }
        return new AddressDistrictVO(district);
    }

    public get(): string {
        return this.district;
    }
}