import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameInventoryItemToInventory1755384687045 implements MigrationInterface {
    name = 'RenameInventoryItemToInventory1755384687045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory" (
            "inventory_id" BIGSERIAL NOT NULL, 
            "product_id" bigint NOT NULL, 
            "lot_id" bigint NOT NULL, 
            "branch_office_id" bigint NOT NULL, 
            "sale_price_one" numeric(12,2), 
            "sale_price_many" numeric(12,2), 
            "sale_quantity_many" numeric(18,4), 
            "sale_price_special" numeric(12,2), 
            "min_stock_branch" numeric(18,3), 
            "max_stock_branch" numeric(18,3), 
            "is_sellable" boolean NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_711db979ad954f0ab33e3eea53a" 
            PRIMARY KEY ("inventory_id"))`);
        await queryRunner.query(`ALTER TABLE "inventory" 
            ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" 
            FOREIGN KEY ("product_id") REFERENCES "product"("product_id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_8a64c15f2f9662ba7e899b108ac" FOREIGN KEY ("lot_id") REFERENCES "lot"("lot_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_735e19a378152b4fadfb7c82852" FOREIGN KEY ("branch_office_id") REFERENCES "branch_office"("branch_office_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_735e19a378152b4fadfb7c82852"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_8a64c15f2f9662ba7e899b108ac"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_732fdb1f76432d65d2c136340dc"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
    }

}
