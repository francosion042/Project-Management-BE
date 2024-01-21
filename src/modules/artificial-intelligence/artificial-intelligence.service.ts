import { Injectable } from '@nestjs/common';
import { OpenAiService } from '../api-integrations/openAi.service';
import { extractTasks } from './utils/index.util';
import { ProjectService } from '../project/project.service';
import { TaskColumnService } from '../task-column/task-column.service';
import { TaskService } from '../task/task.service';

@Injectable()
export class ArtificialIntelligenceService {
  constructor(
    private openAiService: OpenAiService,
    private readonly projectService: ProjectService,
    private readonly taskColumnService: TaskColumnService,
    private readonly taskService: TaskService,
  ) {}

  async generateColumnsAndTasks(id: number) {
    const project = await this.projectService.findOne(id);

    const prompt =
      `Generate ${project.category} tasks and their descriptions for a project with the following details:\n\n` +
      `Project Name: ${project.name}\n` +
      `Project Description: ${project.description}\n\n` +
      `Categories:\n[AI will determine the number of categories and number them and list them with their titles]\n\n` +
      `Tasks:\n[AI will determine the number of tasks and their description per category for each category and list them under each category using only bullet points and it must be in this format title:description]`;

    const generatedResponse = await this.openAiService.generateResponse({
      prompt,
    });

    const extractedData = extractTasks(generatedResponse);
    console.log(extractedData);

    for (const category in extractedData) {
      const column = await this.taskColumnService.create({
        name: category,
        projectId: project.id,
        creator: project.owner,
      });

      for (const extractedDataTask of extractedData[category]) {
        await this.taskService.create({
          title: extractedDataTask.title,
          description: extractedDataTask.description,
          creator: project.owner,
          taskColumnId: column.id,
          projectId: project.id,
          difficulty: 'EASY',
          priority: 'LOW',
          duration: { durationNumber: 24, durationType: 'days' },
        });
      }
    }

    return project;
  }
}
