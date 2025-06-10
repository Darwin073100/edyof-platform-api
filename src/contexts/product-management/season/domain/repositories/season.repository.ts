import { SeasonEntity } from '../entities/season.entity';

export const SEASON_REPOSITORY = Symbol('SEASON_REPOSITORY');

export interface SeasonRepository {
  findById(seasonId: bigint): Promise<SeasonEntity | null>;
  findAll(): Promise<SeasonEntity[]>;
  save(entity: SeasonEntity): Promise<SeasonEntity>;
}
