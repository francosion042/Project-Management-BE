import {
  type EntitySubscriberInterface,
  EventSubscriber,
  type InsertEvent,
} from 'typeorm';

import { getInitials } from '../../common/utils';
import { Task } from './entities/task.entity';

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  listenTo(): typeof Task {
    return Task;
  }

  async beforeInsert(event: InsertEvent<Task>): Promise<void> {
    const tasks = await event.manager.findBy(Task, {
      projectId: event.entity.projectId,
    });
    event.entity.label = `${getInitials(event.entity.title)}-${
      tasks.length + 1
    }`;
  }
}
