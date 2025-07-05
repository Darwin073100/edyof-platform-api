import { SeasonCheckerPort } from "src/contexts/product-management/season/domain/ports/out/season-checker.port";
import { SeasonOrmEntity } from "../entities/season.orm-entity";
import { DataSource, Repository } from "typeorm";

export class TypeormSeasonCheckerAdapter implements SeasonCheckerPort {
    private readonly repository: Repository<SeasonOrmEntity>;
    
    constructor(private readonly datasource: DataSource) {
        this.repository = this.datasource.getRepository(SeasonOrmEntity);
    }

    async exists(seasonId: bigint): Promise<boolean> {
        const result = await this.repository.existsBy({ seasonId });
        return result;
    }

}