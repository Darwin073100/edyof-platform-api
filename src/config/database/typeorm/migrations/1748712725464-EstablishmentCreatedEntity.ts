import { MigrationInterface, QueryRunner } from "typeorm";

export class EstablishmentCreatedEntity1748712725464 implements MigrationInterface {
    name = 'EstablishmentCreatedEntity1748712725464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "establishment" ("establishment_id" BIGSERIAL NOT NULL, "name" character varying(250) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_58a3c0e6b35c7e30aa3a58b3afd" UNIQUE ("name"), CONSTRAINT "PK_48297b8d13bd60cbad537ed3545" PRIMARY KEY ("establishment_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "establishment"`);
    }

}
