import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPurchaseUtitToLot1754849886722 implements MigrationInterface {
    name = 'AddPurchaseUtitToLot1754849886722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lot_purchase_unit_enum" AS ENUM('kg', 'l', 'm', 'pc', 'doc', 'paquete', 'caja', 'set')`);
        await queryRunner.query(`ALTER TABLE "lot" ADD "purchase_unit" "public"."lot_purchase_unit_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lot" DROP COLUMN "purchase_unit"`);
        await queryRunner.query(`DROP TYPE "public"."lot_purchase_unit_enum"`);
    }

}
