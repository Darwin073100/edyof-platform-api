import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegisterSeasonUseCase } from "../../application/use-cases/register-season.use-case";
import { RegisterSeasonDto } from "../../application/dtos/register-season.dto";
import { RegisterSeasonRequestDto } from "../dtos/register-season-request.dto";
import { SeasonMapper } from "../../application/mappers/season-mapper";
import { SeasonResponseDto } from "../../application/dtos/season-response.dto";
import { SeasonAlreadyExistsException } from "../../domain/exceptions/season-already-exists.exception";
import { InvalidSeasonException } from "../../domain/exceptions/invalid-season.exception";

@Controller('seasons')
export class SeasonController {
  constructor(private readonly registerSeasonUseCase: RegisterSeasonUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async registerSeason(
    @Body() registerRequestDto: RegisterSeasonRequestDto
  ): Promise<SeasonResponseDto> {
    try {
      const registerAppDto = new RegisterSeasonDto(
        registerRequestDto.name,
        registerRequestDto.description ?? null,
        new Date(registerRequestDto.dateInit),
        new Date(registerRequestDto.dateFinish)
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
}
