import { TemplateRepository } from "src/shared/domain/repositories/template.repository";
import { LotEntity } from "../entities/lot.entity";

export const LOT_REPOSITORY = Symbol('LOT_REPOSITORY');

export interface LotRepository extends TemplateRepository<LotEntity>{

}