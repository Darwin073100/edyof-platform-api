import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleCreateEntity1750307231685 implements MigrationInterface {
    name = 'RoleCreateEntity1750307231685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" (
            "role_id" BIGSERIAL NOT NULL, 
            "name" character varying(50) NOT NULL, 
            "description" text, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), 
            CONSTRAINT "PK_df46160e6aa79943b83c81e496e" PRIMARY KEY ("role_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
