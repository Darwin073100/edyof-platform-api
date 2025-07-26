export class RegisterSeasonDto {
  constructor(
    public readonly name: string,
    public readonly description: string | null,
    public readonly dateInit?: Date | null,
    public readonly dateFinish?: Date | null,
  ) {}
}
