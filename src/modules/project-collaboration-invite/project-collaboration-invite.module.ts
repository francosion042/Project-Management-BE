import { Module } from '@nestjs/common';
import { ProjectCollaborationInviteService } from './project-collaboration-invite.service';
import { ProjectCollaborationInviteController } from './project-collaboration-invite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCollaborationInvite } from './entities/project-collaboration-invite.entity';
import { MailerModule } from '../mailer/mailer.module';
import { ProjectModule } from '../project/project.module';
import { MailerService } from '../mailer/mailer.service';
import { ProjectCollaborationModule } from '../project-collaboration/project-collaboration.module';

@Module({
  imports: [
    MailerModule,
    ProjectModule,
    ProjectCollaborationModule,
    TypeOrmModule.forFeature([ProjectCollaborationInvite]),
  ],
  controllers: [ProjectCollaborationInviteController],
  providers: [ProjectCollaborationInviteService, MailerService],
  exports: [ProjectCollaborationInviteService],
})
export class ProjectCollaborationInviteModule {}
