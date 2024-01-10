import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectCollaborationService } from './project-collaboration.service';
import { CreateProjectCollaborationDto } from './dto/create-project-collaboration.dto';
import { UpdateProjectCollaborationDto } from './dto/update-project-collaboration.dto';

@Controller('project-collaboration')
export class ProjectCollaborationController {
  constructor(private readonly projectCollaborationService: ProjectCollaborationService) {}

  @Post()
  create(@Body() createProjectCollaborationDto: CreateProjectCollaborationDto) {
    return this.projectCollaborationService.create(createProjectCollaborationDto);
  }

  @Get()
  findAll() {
    return this.projectCollaborationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectCollaborationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectCollaborationDto: UpdateProjectCollaborationDto) {
    return this.projectCollaborationService.update(+id, updateProjectCollaborationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectCollaborationService.remove(+id);
  }
}
