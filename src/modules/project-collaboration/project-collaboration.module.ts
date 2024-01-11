import { Module } from '@nestjs/common';
import { ProjectCollaborationService } from './project-collaboration.service';
import { ProjectCollaborationController } from './project-collaboration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCollaboration } from './entities/project-collaboration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectCollaboration])],
  controllers: [ProjectCollaborationController],
  providers: [ProjectCollaborationService],
  exports: [ProjectCollaborationService],
})
export class ProjectCollaborationModule {}
