import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserSubscriber } from '../modules/user/user.subscriber';
import { SnakeNamingStrategy } from '../snake-naming.strategy';
import { EnvConfigService } from '../envConfig/envConfig.service';

@Injectable()
export class DatabaseService {
  constructor(private envConfig: EnvConfigService) {}
  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../modules/**/*.entity{.ts,.js}',
      __dirname + '/../modules/**/*.view-entity{.ts,.js}',
    ];
    const migrations = [__dirname + '/migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      keepConnectionAlive: !this.envConfig.isTest,
      dropSchema: this.envConfig.isTest,
      type: 'postgres',
      host: this.envConfig.getString('DB_HOST'),
      port: this.envConfig.getNumber('DB_PORT'),
      username: this.envConfig.getString('DB_USERNAME'),
      password: this.envConfig.getString('DB_PASSWORD'),
      database: this.envConfig.getString('DB_NAME'),
      subscribers: [UserSubscriber],
      migrationsRun: true,
      logging: this.envConfig.getBoolean('ENABLE_ORM_LOGS'),
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
