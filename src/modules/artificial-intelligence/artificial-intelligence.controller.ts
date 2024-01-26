import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArtificialIntelligenceService } from './artificial-intelligence.service';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class ArtificialIntelligenceController {
  constructor(
    private readonly artificialIntelligenceService: ArtificialIntelligenceService,
  ) {}

  @Post('projects/:project_id/generate-tasks')
  async generateColumnsAndTasks(@Param('project_id') projectId: string) {
    const project =
      await this.artificialIntelligenceService.generateColumnsAndTasks(
        Number(projectId),
      );

    return new BaseResponseDto(
      201,
      'AI Has Created Possible Columns and Tasks Successfully',
      project,
    );
  }

  @Post('columns/:column_id/generate-tasks')
  async generateColumnTasks(@Param('column_id') columnId: string) {
    const column = await this.artificialIntelligenceService.generateColumnTasks(
      Number(columnId),
    );

    return new BaseResponseDto(
      201,
      'AI Has Created Possible Tasks For The Column Successfully',
      column,
    );
  }

  @Post('tasks/:task_id/generate-task-description')
  @HttpCode(HttpStatus.OK)
  async generateTaskDescription(@Param('task_id') taskId: string) {
    const task =
      await this.artificialIntelligenceService.generateTaskDescription(
        Number(taskId),
      );

    return new BaseResponseDto(
      200,
      'AI Has Created Possible Description For The Task Successfully',
      task,
    );
  }

  @Post('tasks/:task_id/generate-task-requirements')
  @HttpCode(HttpStatus.OK)
  async generateTaskRequirements(@Param('task_id') taskId: string) {
    const task =
      await this.artificialIntelligenceService.generateTaskRequirements(
        Number(taskId),
      );

    return new BaseResponseDto(
      200,
      'AI Has Created Possible Task Requirements For The Task Successfully',
      task,
    );
  }
}
