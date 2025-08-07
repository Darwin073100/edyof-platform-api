import { MigrationInterface, QueryRunner } from "typeorm";

export class CambiosEmployee1754506741260 implements MigrationInterface {
    name = 'CambiosEmployee1754506741260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "hire_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "current_salary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "current_salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "is_active" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "is_active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "current_salary" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "current_salary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "hire_date" SET NOT NULL`);
    }

}
