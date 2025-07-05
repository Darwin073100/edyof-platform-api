import { MigrationInterface, QueryRunner } from "typeorm";

export class SuplierCreateEntity1751758563186 implements MigrationInterface {
    name = 'SuplierCreateEntity1751758563186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suplier" (
            "suplier_id" BIGSERIAL NOT NULL, 
            "name" character varying(150) NOT NULL, 
            "phone_number" character varying(25) NOT NULL, 
            "rfc" character varying(13), 
            "contact_person" character varying(100), 
            "email" character varying(100), 
            "notes" text, 
            "address_id" bigint NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_d9aa066a07cc860ebf5368c5bb3" UNIQUE ("rfc"), 
            CONSTRAINT "UQ_2c4044f9dfcf5e2401af2b1fe18" UNIQUE ("email"), 
            CONSTRAINT "UQ_99627221092cc52719692a21ff6" UNIQUE ("address_id"), 
            CONSTRAINT "REL_99627221092cc52719692a21ff" UNIQUE ("address_id"), 
            CONSTRAINT "PK_b220fa0770e30166f3b2fb73445" PRIMARY KEY ("suplier_id"))`);
        await queryRunner.query(`ALTER TABLE "suplier" ADD CONSTRAINT "FK_99627221092cc52719692a21ff6" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suplier" DROP CONSTRAINT "FK_99627221092cc52719692a21ff6"`);
        await queryRunner.query(`DROP TABLE "suplier"`);
    }

}
