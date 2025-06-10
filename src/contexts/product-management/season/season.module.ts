import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonOrmEntity } from './infraestructure/persistence/typeorm/entities/season.orm-entity';
import { SeasonController } from './presentation/controllers/season.controller';
import { RegisterSeasonUseCase } from './application/use-cases/register-season.use-case';
import { SEASON_REPOSITORY, SeasonRepository } from './domain/repositories/season.repository';
import { TypeormSeasonRepository } from './infraestructure/persistence/typeorm/repositories/typeorm-season.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonOrmEntity])],
  controllers: [SeasonController],
  providers: [
    {
      provide: SEASON_REPOSITORY,
      useClass: TypeormSeasonRepository
    },
    {
      provide: RegisterSeasonUseCase,
      useFactory: (repo: SeasonRepository) => {
        return new RegisterSeasonUseCase(repo);
      },
      inject: [SEASON_REPOSITORY],
    },
  ],
})
export class SeasonModule {}
