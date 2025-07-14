import { MigrationInterface, QueryRunner } from "typeorm";

export class LotCreateEntity1751776440559 implements MigrationInterface {
    name = 'LotCreateEntity1751776440559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lot" (
            "lot_id" BIGSERIAL NOT NULL, 
            "product_id" bigint NOT NULL, 
            "lot_number" character varying(50) NOT NULL, 
            "purchase_price" numeric(12,4) NOT NULL, 
            "initial_quantity" numeric(18,3) NOT NULL, 
            "expiration_date" date, 
            "manufacturing_date" date, 
            "received_date" date NOT NULL DEFAULT ('now'::text)::date, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_0b12153cdb29b8016846629c89f" PRIMARY KEY ("lot_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_47dc7829fdca47653512ca28e2" ON "lot" ("product_id", "lot_number") `);
        await queryRunner.query(`ALTER TABLE "lot" ADD CONSTRAINT "FK_e79764f0f61ae488d54f3170923" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lot" DROP CONSTRAINT "FK_e79764f0f61ae488d54f3170923"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47dc7829fdca47653512ca28e2"`);
        await queryRunner.query(`DROP TABLE "lot"`);
    }

}
