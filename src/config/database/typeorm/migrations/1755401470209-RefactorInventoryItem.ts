import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorInventoryItem1755401470209 implements MigrationInterface {
    name = 'RefactorInventoryItem1755401470209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_b70c6bca6b0d4605c55182660a7"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_fae01889049e5a2f4727c7cdf66"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_228d5b118cf44396b18f07357b7"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "lot_id"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "branch_office_id"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "sale_price_one"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "sale_price_many"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "min_stock_branch"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "max_stock_branch"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "is_sellable"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "sale_quantity_many"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "sale_price_special"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "inventory_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_a2129b235bd560a0a725ae3404b" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("inventory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP CONSTRAINT "FK_a2129b235bd560a0a725ae3404b"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "inventory_id"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "sale_price_special" numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "sale_quantity_many" numeric(18,4)`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "is_sellable" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "max_stock_branch" numeric(18,3)`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "min_stock_branch" numeric(18,3)`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "sale_price_many" numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "sale_price_one" numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "branch_office_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "lot_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "product_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_228d5b118cf44396b18f07357b7" FOREIGN KEY ("branch_office_id") REFERENCES "branch_office"("branch_office_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_fae01889049e5a2f4727c7cdf66" FOREIGN KEY ("lot_id") REFERENCES "lot"("lot_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD CONSTRAINT "FK_b70c6bca6b0d4605c55182660a7" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
