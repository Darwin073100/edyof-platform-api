import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNameL150L250BranchOfficeEntity1749155909962 implements MigrationInterface {
    name = 'UpdateNameL150L250BranchOfficeEntity1749155909962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch_office" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "branch_office" ADD "name" character varying(250) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch_office" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "branch_office" ADD "name" character varying(150) NOT NULL`);
    }

}
