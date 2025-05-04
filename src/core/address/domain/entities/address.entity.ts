import { BaseEntity } from "src/core/shared/domain/base.entity";
import { AddressPostalCodeVO } from "../../value-objects/address.postal-code.vo";
import { AddressStreetVO } from "../../value-objects/address.street.vo";
import { AddressInteriorNumberVO } from "../../value-objects/address.interior-number.vo";
import { AddressExteriorNumberVO } from "../../value-objects/address.exterior-number.vo";
import { AddressDistrictVO } from "../../value-objects/address.district.vo";
import { AddressCityVO } from "../../value-objects/address.city.vo";
import { AddressStateVO } from "../../value-objects/address.state.vo";

export class AddressEntity extends BaseEntity{
    addressId?: bigint;
    postalCode: AddressPostalCodeVO;
    street: AddressStreetVO;
    interiorNumber: AddressInteriorNumberVO;
    exteriorNumber: AddressExteriorNumberVO;
    district: AddressDistrictVO;
    city: AddressCityVO;
    state: AddressStateVO;
}