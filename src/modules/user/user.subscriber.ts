import {
  type EntitySubscriberInterface,
  EventSubscriber,
  type InsertEvent,
  type UpdateEvent,
} from 'typeorm';

import { generateHash } from '../../common/utils';
import { User } from './entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo(): typeof User {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): void {
    if (event.entity.password) {
      event.entity.password = generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<User>): void {
    const entity = event.entity as User;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = generateHash(entity.password!);
    }
  }
}
