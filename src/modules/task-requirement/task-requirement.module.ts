import { Module } from '@nestjs/common';
import { TaskRequirementService } from './task-requirement.service';
import { TaskRequirementController } from './task-requirement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRequirement } from './entities/task-requirement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRequirement])],
  controllers: [TaskRequirementController],
  providers: [TaskRequirementService],
  exports: [TaskRequirementService],
})
export class TaskRequirementModule {}
