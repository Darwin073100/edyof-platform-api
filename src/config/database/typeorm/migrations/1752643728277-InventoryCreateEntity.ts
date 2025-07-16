import { MigrationInterface, QueryRunner } from "typeorm";

export class InventoryCreateEntity1752643728277 implements MigrationInterface {
    name = 'InventoryCreateEntity1752643728277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."inventory_item_location_enum" 
            AS ENUM('venta', 'almacen', 'dañado', 'viajando')`);
        await queryRunner.query(`CREATE TABLE "inventory_item" (
            "inventory_item_id" BIGSERIAL NOT NULL, 
            "product_id" bigint NOT NULL, 
            "lot_id" bigint NOT NULL, 
            "branch_office_id" bigint NOT NULL, 
            "location" "public"."inventory_item_location_enum", 
            "internalBarCode" character varying(100), 
            "quantity_on_hand" numeric(18,3) NOT NULL DEFAULT '0', 
            "purchase_price_at_stock" numeric(12,4) NOT NULL, 
            "sale_price_one" numeric(12,2), 
            "sale_price_many" numeric(12,2), 
            "min_stock_branch" numeric(18,3), 
            "max_stock_branch" numeric(18,3), 
            "last_stocked_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "is_sellable" boolean NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_2bbb156c5e22a172468f04b0ec8" PRIMARY KEY ("inventory_item_id"))`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_b70c6bca6b0d4605c55182660a7" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_fae01889049e5a2f4727c7cdf66" FOREIGN KEY ("lot_id") REFERENCES "lot"("lot_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_228d5b118cf44396b18f07357b7" FOREIGN KEY ("branch_office_id") REFERENCES "branch_office"("branch_office_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_228d5b118cf44396b18f07357b7"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_fae01889049e5a2f4727c7cdf66"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_b70c6bca6b0d4605c55182660a7"`);
        await queryRunner.query(`DROP TABLE "inventory_item"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_item_location_enum"`);
    }

}
