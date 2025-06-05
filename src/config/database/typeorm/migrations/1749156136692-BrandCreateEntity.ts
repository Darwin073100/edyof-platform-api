import { MigrationInterface, QueryRunner } from "typeorm";

export class BrandCreateEntity1749156136692 implements MigrationInterface {
    name = 'BrandCreateEntity1749156136692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand" (
            "brand_id" BIGSERIAL NOT NULL, 
            "name" character varying(100) NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"), 
            CONSTRAINT "PK_a6201ff889d4681c6e521d26231" PRIMARY KEY ("brand_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "brand"`);
    }

}
