import { Module } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';

@Module({
  controllers: [SubTaskController],
  providers: [SubTaskService],
})
export class SubTaskModule {}
