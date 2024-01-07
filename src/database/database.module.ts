import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { EnvConfigModule } from '../envConfig/envConfig.module';
@Module({
  imports: [EnvConfigModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
