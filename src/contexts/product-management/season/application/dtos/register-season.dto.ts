export class RegisterSeasonDto {
  constructor(
    public readonly name: string,
    public readonly description: string | null,
    public readonly dateInit: Date,
    public readonly dateFinish: Date,
  ) {}
}
