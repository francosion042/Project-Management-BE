import { Module } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTask } from './entities/sub-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubTask])],
  controllers: [SubTaskController],
  providers: [SubTaskService],
  exports: [SubTaskService],
})
export class SubTaskModule {}
