import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionalDateInitAndFinishInSeason1753419531867 implements MigrationInterface {
    name = 'OptionalDateInitAndFinishInSeason1753419531867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "season" ALTER COLUMN "date_init" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "season" ALTER COLUMN "date_finish" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "season" ALTER COLUMN "date_finish" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "season" ALTER COLUMN "date_init" SET NOT NULL`);
    }

}
