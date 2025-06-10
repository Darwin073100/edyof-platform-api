import { MigrationInterface, QueryRunner } from "typeorm";

export class SeasonCreateEntity1749533666562 implements MigrationInterface {
    name = 'SeasonCreateEntity1749533666562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "season" (
            "season_id" BIGSERIAL NOT NULL, 
            "name" character varying(100) NOT NULL, 
            "description" text, 
            "date_init" date NOT NULL, 
            "date_finish" date NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_b3e4a42a8be8b449354a8b31cc9" UNIQUE ("name"), 
            CONSTRAINT "PK_3b43f8b4429c26d79b572a3cc19" PRIMARY KEY ("season_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "season"`);
    }

}
