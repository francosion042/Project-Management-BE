import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfigService } from '../envConfig/envConfig.service';
import { SnakeNamingStrategy } from '../snake-naming.strategy';

@Injectable()
export class DatabaseService {
  constructor(private envConfig: EnvConfigService) {}
  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../modules/**/entities/*.entity{.ts,.js}',
      __dirname + '/../modules/**/entities/*.view-entity{.ts,.js}',
    ];
    const migrations = [__dirname + '/migrations/*{.ts,.js}'];
    const subscribers = [__dirname + '/../modules/**/*.subscriber{.ts,.js}'];

    return {
      entities,
      migrations,
      subscribers,
      keepConnectionAlive: !this.envConfig.isTest,
      dropSchema: this.envConfig.isTest,
      type: 'postgres',
      ...(this.envConfig.isProduction && {
        url: this.envConfig.getString('DB_URL'),
      }),
      ...(this.envConfig.isDevelopment && {
        host: this.envConfig.getString('DB_HOST'),
        port: this.envConfig.getNumber('DB_PORT'),
        username: this.envConfig.getString('DB_USERNAME'),
        password: this.envConfig.getString('DB_PASSWORD'),
        database: this.envConfig.getString('DB_NAME'),
      }),
      migrationsRun: this.envConfig.isProduction,
      logging: this.envConfig.getBoolean('ENABLE_ORM_LOGS'),
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
    };
  }
}
