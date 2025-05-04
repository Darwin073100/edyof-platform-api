import { AddressCityVO } from "../../value-objects/address.city.vo";
import { AddressDistrictVO } from "../../value-objects/address.district.vo";
import { AddressExteriorNumberVO } from "../../value-objects/address.exterior-number.vo";
import { AddressInteriorNumberVO } from "../../value-objects/address.interior-number.vo";
import { AddressPostalCodeVO } from "../../value-objects/address.postal-code.vo";
import { AddressStateVO } from "../../value-objects/address.state.vo";
import { AddressStreetVO } from "../../value-objects/address.street.vo";

export interface CreateAddressAppDto {
  postalCode: AddressPostalCodeVO;
  street: AddressStreetVO;
  interiorNumber: AddressInteriorNumberVO;
  exteriorNumber: AddressExteriorNumberVO;
  district: AddressDistrictVO;
  city: AddressCityVO;
  state: AddressStateVO;
}