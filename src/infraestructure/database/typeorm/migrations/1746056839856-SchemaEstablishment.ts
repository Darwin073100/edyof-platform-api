import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaEstablishment1746056839856 implements MigrationInterface {
    name = 'SchemaEstablishment1746056839856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "address_id" BIGSERIAL NOT NULL, "postal_code" integer NOT NULL, "street" text NOT NULL, "interior_number" character varying(10), "exterior_number" character varying(10), "district" text NOT NULL, "city" text NOT NULL, "state" character varying(100) NOT NULL, CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id"))`);
        await queryRunner.query(`CREATE TABLE "branch_office" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "branch_office_id" BIGSERIAL NOT NULL, "address_id" bigint NOT NULL, "establishment_id" bigint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_ed90edcfa924ec9ec45da7c66d7" UNIQUE ("name"), CONSTRAINT "REL_b60100709d7f1bba4028c87bf9" UNIQUE ("address_id"), CONSTRAINT "PK_7471928922911b9a2539c74a98e" PRIMARY KEY ("branch_office_id"))`);
        await queryRunner.query(`CREATE TABLE "establishment" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP, "establishment_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_58a3c0e6b35c7e30aa3a58b3afd" UNIQUE ("name"), CONSTRAINT "PK_48297b8d13bd60cbad537ed3545" PRIMARY KEY ("establishment_id"))`);
        await queryRunner.query(`ALTER TABLE "branch_office" ADD CONSTRAINT "FK_b60100709d7f1bba4028c87bf99" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch_office" ADD CONSTRAINT "FK_7c9270071c3b4602ae58b2de238" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("establishment_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch_office" DROP CONSTRAINT "FK_7c9270071c3b4602ae58b2de238"`);
        await queryRunner.query(`ALTER TABLE "branch_office" DROP CONSTRAINT "FK_b60100709d7f1bba4028c87bf99"`);
        await queryRunner.query(`DROP TABLE "establishment"`);
        await queryRunner.query(`DROP TABLE "branch_office"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
