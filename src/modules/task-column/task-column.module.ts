import { Module } from '@nestjs/common';
import { TaskColumnService } from './task-column.service';
import { TaskColumnController } from './task-column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskColumn } from './entities/task-column.entity';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ProjectModule, UserModule, TypeOrmModule.forFeature([TaskColumn])],
  controllers: [TaskColumnController],
  providers: [TaskColumnService],
  exports: [TaskColumnService],
})
export class TaskColumnModule {}
