import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1704558786419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users"
            (
        "id"         SERIAL               PRIMARY KEY,
        "first_name" character varying,
        "last_name"  character varying,
        "email"      character varying    UNIQUE,
        "password"   character varying,
        "mobile"     character varying,
        "is_active"  boolean              DEFAULT true,
        "created_at" TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
