import { SeasonEntity } from "../../domain/entities/season.entity";
import { SeasonNotFoundException } from "../../domain/exceptions/season-not-found.exception";
import { SeasonRepository } from "../../domain/repositories/season.repository";
import { SeasonDescriptionVO } from "../../domain/value-objects/season-description.vo";
import { SeasonNameVO } from "../../domain/value-objects/season-name.vo";
import { UpdateSeasonDto } from "../dtos/update-season.dto";

export class UpdateSeasonUseCase{
    constructor(
        private readonly seasonRepository: SeasonRepository,
    ){}

    async execute(dto: UpdateSeasonDto): Promise<SeasonEntity> {
        const season = await this.seasonRepository.findById(dto.seasonId);
        if (!season) {
            throw new SeasonNotFoundException('La temporada especificada no existe.');
        }

        season.updateName(SeasonNameVO.create(dto.name));
        season.updateDescription(SeasonDescriptionVO.create(dto.description));
        season.updateDateInit(dto.dateInit ?? null);
        season.updateDateFinish(dto.dateFinish ?? null);
        return this.seasonRepository.save(season);
    }
}