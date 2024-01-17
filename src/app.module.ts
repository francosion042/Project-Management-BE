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
import { ProjectCollaborationInviteModule } from './modules/project-collaboration-invite/project-collaboration-invite.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProjectCollaborationInviteController } from './modules/project-collaboration-invite/project-collaboration-invite.controller';
import { TaskModule } from './modules/task/task.module';
import { TaskController } from './modules/task/task.controller';
import { TaskColumnModule } from './modules/task-column/task-column.module';
import { TaskColumnController } from './modules/task-column/task-column.controller';
import { ApiIntegrationsModule } from './modules/api-integrations/api-integrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ProjectModule,
    ProjectCollaborationModule,
    ProjectCollaborationInviteModule,
    MailerModule,
    TaskModule,
    TaskColumnModule,
    ApiIntegrationsModule,
    EventEmitterModule.forRoot(),
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
    TaskController,
    ProjectController,
    TaskColumnController,
    ProjectCollaborationController,
    ProjectCollaborationInviteController,
  ],
  providers: [AppService],
})
export class AppModule {}
