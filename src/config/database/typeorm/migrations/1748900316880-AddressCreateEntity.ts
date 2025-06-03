import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressCreateEntity1748900316880 implements MigrationInterface {
    name = 'AddressCreateEntity1748900316880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" (
            "address_id" BIGSERIAL NOT NULL, 
            "street" character varying(255) NOT NULL, 
            "external_number" character varying(20) NOT NULL, 
            "internal_number" character varying(20), 
            "district" character varying(100) NOT NULL, 
            "city" character varying(100) NOT NULL, 
            "state" character varying(100) NOT NULL, 
            "postal_code" character varying(10) NOT NULL, 
            "country" character varying(100) NOT NULL, 
            "reference" text, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
