import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskRequirementsTable1706207798167
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "task_requirements"
            (
        "id"                SERIAL               PRIMARY KEY,
        "description"       TEXT,
        "status"            CHARACTER VARYING    DEFAULT 'IN PROGRESS',
        "task_id"           INTEGER REFERENCES "tasks"("id") ON DELETE CASCADE,
        "created_at"        TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_requirements');
  }
}
