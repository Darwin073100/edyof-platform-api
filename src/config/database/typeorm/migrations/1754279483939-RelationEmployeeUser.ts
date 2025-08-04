import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationEmployeeUser1754279483939 implements MigrationInterface {
    name = 'RelationEmployeeUser1754279483939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_135936b6918bd375a4479b92311" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_135936b6918bd375a4479b92311" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_135936b6918bd375a4479b92311"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_135936b6918bd375a4479b92311"`);
    }

}
