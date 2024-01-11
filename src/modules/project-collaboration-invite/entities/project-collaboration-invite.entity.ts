import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { InviteStatus } from './index.enum';

@Entity('project_collaboration_invites')
export class ProjectCollaborationInvite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('jsonb')
  permissions: object;

  @Column({ type: 'enum', enum: InviteStatus })
  status: string;

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
}
