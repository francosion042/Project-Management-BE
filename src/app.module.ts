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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ProjectModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (configService: DatabaseService) =>
        configService.postgresConfig,
      inject: [DatabaseService],
    }),
  ],
  controllers: [AppController, UserController, ProjectController],
  providers: [AppService],
})
export class AppModule {}
