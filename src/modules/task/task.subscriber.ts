import {
  type EntitySubscriberInterface,
  EventSubscriber,
  type InsertEvent,
} from 'typeorm';

import { getInitials } from '../../common/utils';
import { Task } from './entities/task.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Task> {
  listenTo(): typeof Task {
    return Task;
  }

  beforeInsert(event: InsertEvent<Task>): void {
    event.entity.label = getInitials(event.entity.title);
  }
}
