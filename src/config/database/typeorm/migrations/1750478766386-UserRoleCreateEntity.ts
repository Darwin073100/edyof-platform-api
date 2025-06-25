import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleCreateEntity1750478766386 implements MigrationInterface {
    name = 'UserRoleCreateEntity1750478766386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_role" (
            "user_role_id" BIGSERIAL NOT NULL, 
            "user_id" bigint NOT NULL, 
            "role_id" bigint NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deleted_at" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_77580f3bab637e39a7fdd01a94c" PRIMARY KEY ("user_role_id"))`);
        await queryRunner.query(`ALTER TABLE "user_role" 
            ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") 
            REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" 
            ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") 
            REFERENCES "role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
    }

}
