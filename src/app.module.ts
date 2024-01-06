import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EnvConfigService } from './config/services/env.service';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { UserController } from './modules/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: EnvConfigService) =>
        configService.postgresConfig,
      inject: [EnvConfigService],
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
