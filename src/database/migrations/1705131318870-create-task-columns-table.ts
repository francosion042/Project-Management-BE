import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskColumnsTable1705131318870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "task_columns"
            (
        "id"                SERIAL               PRIMARY KEY,
        "name"              CHARACTER VARYING    NOT NULL,
        "description"       CHARACTER VARYING,
        "status"            CHARACTER VARYING    DEFAULT 'OPEN',
        "task_order_ids"    JSONB                DEFAULT '[]'::jsonb,
        "project_id"        INTEGER REFERENCES "projects"("id") ON DELETE CASCADE,
        "creator_id"        INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
        "created_at"        TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_columns');
  }
}
