import { Injectable } from "@nestjs/common";
import { EstablishmentOrmEntity } from "../entities/establishment-orm-entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EstablishmentCheckerPort } from "src/contexts/establishment-management/establishment/application/ports/out/establishment-checker.port";

@Injectable()
export class TypeOrmEstablishmentCheckerAdapter implements EstablishmentCheckerPort {
  constructor(
    @InjectRepository(EstablishmentOrmEntity)
    private readonly establishmentRepository: Repository<EstablishmentOrmEntity>,
  ) {}

  async exists(establishmentId: bigint): Promise<boolean> {
    const count = await this.establishmentRepository.count({
      where: { establishmentId: establishmentId },
    });
    return count > 0;
  }
}