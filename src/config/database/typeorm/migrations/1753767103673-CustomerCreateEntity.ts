import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerCreateEntity1753767103673 implements MigrationInterface {
    name = 'CustomerCreateEntity1753767103673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" (
            "customer_id" BIGSERIAL NOT NULL, 
            "first_name" character varying(150) NOT NULL, 
            "last_name" character varying(100), 
            "company_name" character varying(150), 
            "phone_number" character varying(25), 
            "rfc" character varying(13), 
            "email" character varying(100), 
            "customer_type" character varying(50), 
            "address_id" bigint, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_359eebfa14279084a9592b32c42" UNIQUE ("rfc"), 
            CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), 
            CONSTRAINT "UQ_23810fb397050d8ac37dae44ff6" UNIQUE ("address_id"), 
            CONSTRAINT "REL_23810fb397050d8ac37dae44ff" UNIQUE ("address_id"), 
            CONSTRAINT "PK_cde3d123fc6077bcd75eb051226" PRIMARY KEY ("customer_id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_23810fb397050d8ac37dae44ff6" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_23810fb397050d8ac37dae44ff6"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
