export class SeasonNameVO {
  private constructor(public readonly value: string) {}

  static create(value: string): SeasonNameVO {
    if (!value || value.trim().length < 3 || value.length > 100) {
      throw new Error('El nombre de la temporada debe tener entre 3 y 100 caracteres.');
    }
    return new SeasonNameVO(value.trim());
  }
}
