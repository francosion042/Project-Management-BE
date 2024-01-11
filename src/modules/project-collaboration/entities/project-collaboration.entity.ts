import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';

@Entity('project_collaborations')
export class ProjectCollaboration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  permissions: object;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;

  @Column({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.collaborations)
  project: Project;

  @Column({ name: 'collaborator_id' })
  collaboratorId: number;

  @ManyToOne(() => User, (user) => user.projectCollaborations)
  collaborator: User;
}
