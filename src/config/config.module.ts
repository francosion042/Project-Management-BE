import { Global, Module, type Provider } from '@nestjs/common';
import { EnvConfigService } from './services/env.service';

const providers: Provider[] = [EnvConfigService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class ConfigModule {}
