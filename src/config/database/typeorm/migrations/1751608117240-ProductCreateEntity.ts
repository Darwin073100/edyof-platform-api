import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCreateEntity1751608117240 implements MigrationInterface {
    name = 'ProductCreateEntity1751608117240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_unit_of_measure_enum" AS ENUM('kg', 'l', 'm', 'pc', 'doc', 'paquete', 'caja', 'set')`);
        await queryRunner.query(`CREATE TABLE "product" ("product_id" BIGSERIAL NOT NULL, "establishment_id" bigint NOT NULL, "category_id" bigint NOT NULL, "brand_id" bigint, "season_id" bigint, "name" character varying(150) NOT NULL, "sku" character varying(50), "universal_bar_code" character varying(100), "description" text, "unit_of_measure" "public"."product_unit_of_measure_enum" NOT NULL, "min_stock_global" numeric(18,3) NOT NULL DEFAULT '0', "image_url" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8257684c84ab2a533ec9f76be3" ON "product" ("establishment_id", "universal_bar_code") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b7fc615c93ad77e766374b5e1d" ON "product" ("establishment_id", "sku") `);
        await queryRunner.query(`CREATE INDEX "IDX_57aaf9f1e2f450783692c0d977" ON "product" ("establishment_id", "name") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9442f51326c1f2588083345d8fb" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("establishment_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2" FOREIGN KEY ("brand_id") REFERENCES "brand"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_aa365031a50f63a92601192e5f5" FOREIGN KEY ("season_id") REFERENCES "season"("season_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_aa365031a50f63a92601192e5f5"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9442f51326c1f2588083345d8fb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_57aaf9f1e2f450783692c0d977"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7fc615c93ad77e766374b5e1d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8257684c84ab2a533ec9f76be3"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_unit_of_measure_enum"`);
    }

}
