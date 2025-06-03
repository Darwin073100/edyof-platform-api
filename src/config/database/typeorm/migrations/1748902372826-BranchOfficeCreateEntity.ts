import { MigrationInterface, QueryRunner } from "typeorm";

export class BranchOfficeCreateEntity1748902372826 implements MigrationInterface {
    name = 'BranchOfficeCreateEntity1748902372826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branch_office" (
            "branch_office_id" BIGSERIAL NOT NULL, 
            "name" character varying(150) NOT NULL, 
            "address_id" bigint NOT NULL, 
            "establishment_id" bigint NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_b60100709d7f1bba4028c87bf99" UNIQUE ("address_id"), 
            CONSTRAINT "REL_b60100709d7f1bba4028c87bf9" UNIQUE ("address_id"), 
            CONSTRAINT "PK_7471928922911b9a2539c74a98e" PRIMARY KEY ("branch_office_id"))`);
        await queryRunner.query(`ALTER TABLE "branch_office" ADD CONSTRAINT "FK_b60100709d7f1bba4028c87bf99" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch_office" ADD CONSTRAINT "FK_208cecb8bf36c515636b326c6ab" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("establishment_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch_office" DROP CONSTRAINT "FK_208cecb8bf36c515636b326c6ab"`);
        await queryRunner.query(`ALTER TABLE "branch_office" DROP CONSTRAINT "FK_b60100709d7f1bba4028c87bf99"`);
        await queryRunner.query(`DROP TABLE "branch_office"`);
    }

}
