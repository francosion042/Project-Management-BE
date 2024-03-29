import { Module } from '@nestjs/common';
import { ArtificialIntelligenceService } from './artificial-intelligence.service';
import { ArtificialIntelligenceController } from './artificial-intelligence.controller';
import { ApiIntegrationsModule } from '../api-integrations/api-integrations.module';
import { ProjectModule } from '../project/project.module';
import { TaskColumnModule } from '../task-column/task-column.module';
import { TaskModule } from '../task/task.module';
import { TaskRequirementModule } from '../task-requirement/task-requirement.module';

@Module({
  imports: [
    ApiIntegrationsModule,
    ProjectModule,
    TaskColumnModule,
    TaskModule,
    TaskRequirementModule,
  ],
  controllers: [ArtificialIntelligenceController],
  providers: [ArtificialIntelligenceService],
  exports: [ArtificialIntelligenceService],
})
export class ArtificialIntelligenceModule {}
