import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPropertiesToInventoryItems1752858879162 implements MigrationInterface {
    name = 'AddPropertiesToInventoryItems1752858879162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "sale_quantity_many" numeric(18,4)`);
        await queryRunner.query(`ALTER TABLE "inventory_item" ADD "sale_price_special" numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "sale_price_special"`);
        await queryRunner.query(`ALTER TABLE "inventory_item" DROP COLUMN "sale_quantity_many"`);
    }

}
