import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';
import { ProjectModule } from './modules/project/project.module';
import { ProjectController } from './modules/project/project.controller';
import { ProjectCollaborationModule } from './modules/project-collaboration/project-collaboration.module';
import { ProjectCollaborationController } from './modules/project-collaboration/project-collaboration.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ProjectModule,
    ProjectCollaborationModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (configService: DatabaseService) =>
        configService.postgresConfig,
      inject: [DatabaseService],
    }),
  ],
  controllers: [
    AppController,
    UserController,
    ProjectController,
    ProjectCollaborationController,
  ],
  providers: [AppService],
})
export class AppModule {}
