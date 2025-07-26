import { BadRequestException, Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterSeasonUseCase } from "../../application/use-cases/register-season.use-case";
import { RegisterSeasonDto } from "../../application/dtos/register-season.dto";
import { RegisterSeasonRequestDto } from "../dtos/register-season-request.dto";
import { SeasonMapper } from "../../application/mappers/season-mapper";
import { SeasonResponseDto } from "../../application/dtos/season-response.dto";
import { SeasonAlreadyExistsException } from "../../domain/exceptions/season-already-exists.exception";
import { InvalidSeasonException } from "../../domain/exceptions/invalid-season.exception";
import { ViewAllSeasonsUseCase } from "../../application/use-cases/view-all-seasons.use-case";

@Controller('seasons')
export class SeasonController {
  constructor(
    private readonly registerSeasonUseCase: RegisterSeasonUseCase,
    private readonly viewAllSeasonsUseCase: ViewAllSeasonsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async registerSeason(
    @Body() registerRequestDto: RegisterSeasonRequestDto
  ): Promise<SeasonResponseDto> {
    try {
      const registerAppDto = new RegisterSeasonDto(
        registerRequestDto.name,
        registerRequestDto.description ?? null,
        registerRequestDto.dateInit? new Date(registerRequestDto.dateInit): null,
        registerRequestDto.dateFinish? new Date(registerRequestDto.dateFinish): null,
      );

      const season = await this.registerSeasonUseCase.execute(registerAppDto);
      
      return SeasonMapper.toResponseDto(season);
    } catch (error) {
      if(error instanceof InvalidSeasonException){
        throw new BadRequestException(error.message);
      }

      if (error instanceof SeasonAlreadyExistsException)
        throw new ConflictException(error.message);

      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async viewAllSeasons(){
    try {
      const result = await this.viewAllSeasonsUseCase.execute();
      const seasonList = result.map(item => SeasonMapper.toResponseDto(item));
      return {
        seasons: seasonList
      }

    } catch (error) {
      throw error;
    }
  }
}
