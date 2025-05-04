import { BaseRepository } from "src/core/shared/domain/ports/base.repository";
import { EstablishmentEntity } from "../entities/establishment.entity";

export const ESTABLISHMENT_REPOSITORY = Symbol.for("ESTABLISHMENT_REPOSITORY");

export interface EstablishmentRepository extends BaseRepository<EstablishmentEntity>{}