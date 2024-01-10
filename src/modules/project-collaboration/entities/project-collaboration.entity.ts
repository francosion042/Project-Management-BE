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
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.collaborations)
  project: Project;

  @ManyToOne(() => User, (user) => user.projectCollaborations)
  collaborator: User;
}
