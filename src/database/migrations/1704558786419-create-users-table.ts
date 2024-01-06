import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1704558786419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE 'users'
            (
        "id"         integer              NOT NULL,
        "first_name" character varying,
        "last_name"  character varying,
        "email"      character varying,
        "password"   character varying,
        "phone"      character varying,
        "created_at" TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP            NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
