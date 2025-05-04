import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateBranchOfficeWithAddressDTO } from "../dtos/create.branch-office.with.address.dto";
import { CreateNewBranchOfficeUseCase } from "src/core/branch-office/application/use-cases/create.new.branch-office.use.case";
import { BranchOfficeNameVO } from "src/core/branch-office/value-objects/branch-office.name.vo";
import { BaseIdVO } from "src/core/shared/domain/base.id.vo";
import { AddressStreetVO } from "src/core/address/value-objects/address.street.vo";
import { AddressPostalCodeVO } from "src/core/address/value-objects/address.postal-code.vo";
import { AddressInteriorNumberVO } from "src/core/address/value-objects/address.interior-number.vo";
import { AddressExteriorNumberVO } from "src/core/address/value-objects/address.exterior-number.vo";
import { AddressDistrictVO } from "src/core/address/value-objects/address.district.vo";
import { AddressCityVO } from "src/core/address/value-objects/address.city.vo";
import { AddressStateVO } from "src/core/address/value-objects/address.state.vo";

@Controller('branch-offices')
export class BranchOfficeController{
    constructor(
        @Inject()
        private readonly createNewBranchOfficeUseCase: CreateNewBranchOfficeUseCase,
    ){}

    @Post()
    async saveBranchWithAddress(@Body() dto: CreateBranchOfficeWithAddressDTO){
        await this.createNewBranchOfficeUseCase.execute({
            name: BranchOfficeNameVO.set(dto.name),
            educationalCenterId: BaseIdVO.set(dto.educationalCenterId),
            street: AddressStreetVO.set(dto.street),
            postalCode: AddressPostalCodeVO.set(dto.postalCode),
            interiorNumber: AddressInteriorNumberVO.set(dto.interiorNumber),
            exteriorNumber: AddressExteriorNumberVO.set(dto.exteriorNumber),
            city: AddressCityVO.set(dto.city),
            district: AddressDistrictVO.set(dto.district),
            state: AddressStateVO.set(dto.state),
        });
        return dto;
    }
}