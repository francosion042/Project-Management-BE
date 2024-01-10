import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectCollaborationInvitesTable1704882764638
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "project_collaboration_invites"
            (
        "id"                SERIAL               PRIMARY KEY,
        "permissions"       JSONB,
        "status"            CHARACTER VARYING    DEFAULT 'PENDING',
        "project_id"        INTEGER REFERENCES "projects"("id") ON DELETE CASCADE,
        "created_at"        TIMESTAMP            NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP            NOT NULL DEFAULT now()
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('project_collaboration_invites');
  }
}
