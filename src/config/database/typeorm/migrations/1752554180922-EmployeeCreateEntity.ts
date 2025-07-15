import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeCreateEntity1752554180922 implements MigrationInterface {
    name = 'EmployeeCreateEntity1752554180922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee_role" (
            "employee_role_id" BIGSERIAL NOT NULL, 
            "name" character varying(100) NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_52eb6141f7e93dae55ce01955bb" UNIQUE ("name"), CONSTRAINT "PK_790b9cdd2ac1c0eb09df2500493" PRIMARY KEY ("employee_role_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."employee_gender_enum" AS ENUM(
            'masculino', 
            'femenino', 
            'otro')`);
        await queryRunner.query(`CREATE TABLE "employee" (
            "employee_id" BIGSERIAL NOT NULL, 
            "branch_office_id" bigint NOT NULL, 
            "employee_role_id" bigint NOT NULL, 
            "first_name" character varying(100) NOT NULL, 
            "last_name" character varying(100) NOT NULL, 
            "email" character varying(100) NOT NULL, 
            "phone_number" character varying(25), 
            "address_id" bigint, 
            "birth_date" date, 
            "gender" "public"."employee_gender_enum", 
            "hire_date" date NOT NULL, 
            "termination_date" date, 
            "entry_time" TIME, 
            "exit_time" TIME, 
            "current_salary" 
            numeric(10,2) NOT NULL, 
            "is_active" boolean NOT NULL DEFAULT true, 
            "photo_url" character varying(255), 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), 
            CONSTRAINT "PK_f9d306b968b54923539b3936b03" PRIMARY KEY ("employee_id"))`);
        await queryRunner.query(`ALTER TABLE "employee" 
            ADD CONSTRAINT "FK_a23468d869e3db239e8f3219aa4" 
            FOREIGN KEY ("branch_office_id") 
            REFERENCES "branch_office"("branch_office_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_23de344b8c3b115a80d69cb25e3" 
            FOREIGN KEY ("employee_role_id") 
            REFERENCES "employee_role"("employee_role_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" 
            FOREIGN KEY ("address_id") REFERENCES "address"("address_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_23de344b8c3b115a80d69cb25e3"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_a23468d869e3db239e8f3219aa4"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TYPE "public"."employee_gender_enum"`);
        await queryRunner.query(`DROP TABLE "employee_role"`);
    }

}
