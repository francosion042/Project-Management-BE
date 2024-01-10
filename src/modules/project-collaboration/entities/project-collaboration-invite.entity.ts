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

  @Column('jsonb')
  permissions: object;

  @Column({ type: 'enum', enum: InviteStatus })
  status: string;

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
}
