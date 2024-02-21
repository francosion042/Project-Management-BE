import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';
import { ProjectModule } from './modules/project/project.module';
import { ProjectCollaborationModule } from './modules/project-collaboration/project-collaboration.module';
import { ProjectCollaborationInviteModule } from './modules/project-collaboration-invite/project-collaboration-invite.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TaskModule } from './modules/task/task.module';
import { TaskColumnModule } from './modules/task-column/task-column.module';
import { ApiIntegrationsModule } from './modules/api-integrations/api-integrations.module';
import { ArtificialIntelligenceModule } from './modules/artificial-intelligence/artificial-intelligence.module';
import { TaskRequirementModule } from './modules/task-requirement/task-requirement.module';
import { IsUniqueConstraint } from './common/custom-validators/is-unique.validator';

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
    TaskRequirementModule,
    TaskColumnModule,
    ApiIntegrationsModule,
    ArtificialIntelligenceModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (configService: DatabaseService) =>
        configService.postgresConfig,
      inject: [DatabaseService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // registered custom class
    IsUniqueConstraint,
  ],
})
export class AppModule {}
