import { Controller, Param, Post } from '@nestjs/common';
import { ArtificialIntelligenceService } from './artificial-intelligence.service';
import { BaseResponseDto } from '../../common/dto/base-response.dto';

@Controller('ai')
export class ArtificialIntelligenceController {
  constructor(
    private readonly artificialIntelligenceService: ArtificialIntelligenceService,
  ) {}

  @Post('projects/:project_id/generate-tasks')
  async generateTasks(@Param('project_id') projectId: string) {
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
}
