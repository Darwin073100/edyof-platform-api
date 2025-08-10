import { MigrationInterface, QueryRunner } from "typeorm";

export class LotUnitPurchaseCreateEntity1754762826115 implements MigrationInterface {
    name = 'LotUnitPurchaseCreateEntity1754762826115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lot_unit_purchase_unit_enum" AS ENUM('kg', 'l', 'm', 'pc', 'doc', 'paquete', 'caja', 'set')`);
        await queryRunner.query(`CREATE TABLE "lot_unit_purchase" (
            "lot_unit_purchase_id" BIGSERIAL NOT NULL, "lot_id" bigint NOT NULL, 
            "purchase_price" numeric(18,2) NOT NULL, 
            "purchase_quantity" numeric(18,3) NOT NULL, 
            "unit" "public"."lot_unit_purchase_unit_enum" NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_dadbb838015e6b41c2683c052ad" PRIMARY KEY ("lot_unit_purchase_id"))`);
        await queryRunner.query(`ALTER TABLE "lot_unit_purchase" ADD CONSTRAINT "FK_7e93cb81b9500f42b10cdf3f6dc" FOREIGN KEY ("lot_id") REFERENCES "lot"("lot_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lot_unit_purchase" DROP CONSTRAINT "FK_7e93cb81b9500f42b10cdf3f6dc"`);
        await queryRunner.query(`DROP TABLE "lot_unit_purchase"`);
        await queryRunner.query(`DROP TYPE "public"."lot_unit_purchase_unit_enum"`);
    }

}
