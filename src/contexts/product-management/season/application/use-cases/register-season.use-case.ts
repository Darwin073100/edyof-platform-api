import { SeasonEntity } from "../../domain/entities/season.entity";
import { SeasonRepository } from "../../domain/repositories/season.repository";
import { SeasonDescriptionVO } from "../../domain/value-objects/season-description.vo";
import { SeasonNameVO } from "../../domain/value-objects/season-name.vo";
import { RegisterSeasonDto } from "../dtos/register-season.dto";

export class RegisterSeasonUseCase {
  constructor(private readonly seasonRepository: SeasonRepository) {}

  public async execute(command: RegisterSeasonDto): Promise<SeasonEntity> {
    const name = SeasonNameVO.create(command.name);
    const description = SeasonDescriptionVO.create(command.description);
    const dateInit = command.dateInit;
    const dateFinish = command.dateFinish;
    const season = SeasonEntity.create(
      name,
      dateInit,
      dateFinish,
      description
    );
    return this.seasonRepository.save(season);
  }
}
