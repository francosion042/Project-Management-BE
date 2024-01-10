import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectsTable1704840418529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "projects"
            (
        "id"            SERIAL               PRIMARY KEY,
        "name"          character varying,
        "description"   character varying,
        "status"        character varying    DEFAULT 'OPEN',
        "owner_id"      INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
        "created_at"    TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"    TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
