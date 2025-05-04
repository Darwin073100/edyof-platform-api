import { BaseIdVO } from "src/core/shared/domain/base.id.vo";
import { BranchOfficeNameVO } from "../../value-objects/branch-office.name.vo";
import { AddressPostalCodeVO } from "src/core/address/value-objects/address.postal-code.vo";
import { AddressStreetVO } from "src/core/address/value-objects/address.street.vo";
import { AddressInteriorNumberVO } from "src/core/address/value-objects/address.interior-number.vo";
import { AddressExteriorNumberVO } from "src/core/address/value-objects/address.exterior-number.vo";
import { AddressDistrictVO } from "src/core/address/value-objects/address.district.vo";
import { AddressCityVO } from "src/core/address/value-objects/address.city.vo";
import { AddressStateVO } from "src/core/address/value-objects/address.state.vo";

export class CreateBranchOfficeAppDto{
    name: BranchOfficeNameVO;
    educationalCenterId: BaseIdVO;
    postalCode: AddressPostalCodeVO;
    street: AddressStreetVO;
    interiorNumber: AddressInteriorNumberVO;
    exteriorNumber: AddressExteriorNumberVO;
    district: AddressDistrictVO;
    city: AddressCityVO;
    state: AddressStateVO;
}