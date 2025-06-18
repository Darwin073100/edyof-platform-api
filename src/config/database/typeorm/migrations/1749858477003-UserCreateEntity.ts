import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreateEntity1749858477003 implements MigrationInterface {
    name = 'UserCreateEntity1749858477003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" (
            "user_id" BIGSERIAL NOT NULL, 
            "employee_id" bigint NOT NULL, 
            "username" character varying(100) NOT NULL, 
            "email" character varying(100) NOT NULL, 
            "password_hash" character varying(255) NOT NULL, 
            "is_active" boolean NOT NULL DEFAULT true, 
            "last_login" TIMESTAMP WITH TIME ZONE, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), 
            CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
            CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
