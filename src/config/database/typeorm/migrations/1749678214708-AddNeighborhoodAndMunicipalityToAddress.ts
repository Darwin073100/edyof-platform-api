import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNeighborhoodAndMunicipalityToAddress1749678214708 implements MigrationInterface {
    name = 'AddNeighborhoodAndMunicipalityToAddress1749678214708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "municipality" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "neighborhood" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "neighborhood"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "municipality"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "district" character varying(100) NOT NULL`);
    }

}
