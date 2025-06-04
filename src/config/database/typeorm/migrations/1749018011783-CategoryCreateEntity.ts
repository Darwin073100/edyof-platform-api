import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryCreateEntity1749018011783 implements MigrationInterface {
    name = 'CategoryCreateEntity1749018011783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" (
            "category_id" BIGSERIAL NOT NULL, 
            "name" character varying(100) NOT NULL, 
            "description" text, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), 
            CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
