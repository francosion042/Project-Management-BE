import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubTasksTable1706207798167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "sub_tasks"
            (
        "id"                SERIAL               PRIMARY KEY,
        "title"             CHARACTER VARYING    NOT NULL,
        "description"       TEXT,
        "duration"          JSONB,
        "status"            CHARACTER VARYING    DEFAULT 'IN PROGRESS',
        "task_id"           INTEGER REFERENCES "tasks"("id") ON DELETE CASCADE,
        "created_at"        TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sub_tasks');
  }
}
