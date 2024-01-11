import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectCollaborationService } from './project-collaboration.service';
import { UpdateProjectCollaborationDto } from './dto/update-project-collaboration.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects/:project_id/collaborations')
@UseGuards(JwtAuthGuard)
export class ProjectCollaborationController {
  constructor(
    private readonly projectCollaborationService: ProjectCollaborationService,
  ) {}
  //
  // @Post()
  // create(
  //   @Param('project_id') projectId: string,
  //   @Req() request: Request,
  //   @Body() createProjectCollaborationDto: CreateProjectCollaborationDto,
  // ) {
  //   return this.projectCollaborationService.create(
  //     createProjectCollaborationDto,
  //   );
  // }

  @Get()
  findAll() {
    return this.projectCollaborationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectCollaborationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectCollaborationDto: UpdateProjectCollaborationDto,
  ) {
    return this.projectCollaborationService.update(
      +id,
      updateProjectCollaborationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectCollaborationService.remove(+id);
  }
}
