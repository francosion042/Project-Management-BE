import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectCollaborationsTable1704891171056
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "project_collaborations"
            (
        "id"                SERIAL               PRIMARY KEY,
        "permissions"       JSONB,
        "project_id"        INTEGER REFERENCES "projects"("id") ON DELETE CASCADE,
        "collaborator_id"   INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
        "created_at"        TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_collaborations');
  }
}
