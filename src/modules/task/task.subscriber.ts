import {
  type EntitySubscriberInterface,
  EventSubscriber,
  type InsertEvent,
} from 'typeorm';

import { getInitials } from '../../common/utils';
import { Task } from './entities/task.entity';
import { Project } from '../project/entities/project.entity';

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  listenTo(): typeof Task {
    return Task;
  }

  async beforeInsert(event: InsertEvent<Task>): Promise<void> {
    const project = await event.manager.findOneByOrFail(Project, {
      id: event.entity.projectId,
    });
    const tasks = await event.manager.findBy(Task, {
      projectId: event.entity.projectId,
    });
    event.entity.label = `${getInitials(project.name)}-${tasks.length + 1}`;
  }
}
