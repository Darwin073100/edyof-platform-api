import { TemplateRepository } from "src/shared/domain/repositories/template.repository";
import { BrandEntity } from "../entities/brand.entity";

export const BRAND_REPOSITORY = Symbol('BRAND_REPOSITORY');

export interface BrandRepository extends TemplateRepository<BrandEntity>{

}