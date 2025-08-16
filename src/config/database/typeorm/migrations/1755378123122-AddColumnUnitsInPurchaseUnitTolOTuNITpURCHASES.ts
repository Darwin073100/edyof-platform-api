import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnUnitsInPurchaseUnitTolOTuNITpURCHASES1755378123122 implements MigrationInterface {
    name = 'AddColumnUnitsInPurchaseUnitTolOTuNITpURCHASES1755378123122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lot_unit_purchase" ADD "units_in_purchase_unit" numeric(18,3) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lot_unit_purchase" DROP COLUMN "units_in_purchase_unit"`);
    }

}
