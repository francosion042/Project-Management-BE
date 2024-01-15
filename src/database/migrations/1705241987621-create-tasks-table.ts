import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1705241987621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tasks"
            (
        "id"                SERIAL               PRIMARY KEY,
        "label"             CHARACTER VARYING    NOT NULL,
        "title"             CHARACTER VARYING    NOT NULL,
        "description"       CHARACTER VARYING,
        "status"            CHARACTER VARYING    DEFAULT 'IN PROGRESS',
        "difficulty"        CHARACTER VARYING    DEFAULT 'EASY',
        "priority"          CHARACTER VARYING    DEFAULT 'LOW',
        "duration"          JSONB,
        "project_id"        INTEGER REFERENCES "projects"("id") ON DELETE CASCADE,
        "creator_id"        INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
        "assignee_id"       INTEGER REFERENCES "users"("id") ON DELETE SET NULL,
        "start_date"        TIMESTAMP,
        "due_date"          TIMESTAMP,
        "created_at"        TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
