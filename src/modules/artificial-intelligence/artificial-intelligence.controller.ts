import { Controller, Param, Post, UseGuards } from '@nestjs/common';
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
      'AI Has Created Possible Tasks For THe Column Successfully',
      column,
    );
  }
}
