import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CreateEstablishmentHttpDTO } from "../dtos/create.establishment.http.dto";
import { EstablishmentPresenter } from "../presenters/establsihment.presenter";
import { CreateNewEstablishmentUseCase } from "src/core/establishment/application/use-case/create.new.establishment.use-case";
import { EstablishmentNameVO } from "src/core/establishment/value-objects/establishment.name.vo";
import { CreateEstablishmentAppDTO } from "src/core/establishment/application/dtos/create.establishment.app.dto";
import { viewAllEstablishmentPresenter } from "../../presenters/view.all.establishment.presenter";
import { ViewAllEstablishmentUseCase } from "src/core/establishment/application/use-case/view.all.establishment.use-case";

@Controller('establishments')
export class EstablishmentController{
    constructor(
        @Inject()
        private readonly createNewEstablishmentUseCase: CreateNewEstablishmentUseCase,
        @Inject()
        private readonly viewAllEstablishmentUseCase: ViewAllEstablishmentUseCase,
    ){}

    @Post()
    async saveEstablishment(@Body() httpDto: CreateEstablishmentHttpDTO){
        const appDto: CreateEstablishmentAppDTO = {
            name: EstablishmentNameVO.set(httpDto.name),
        }
        const response = await this.createNewEstablishmentUseCase.execute(appDto);
        return EstablishmentPresenter.toHttp(response);
    }

    @Get()
    async findAllEstablishments(){
        const response = await this.viewAllEstablishmentUseCase.execute();
        return viewAllEstablishmentPresenter(response);
    }
}