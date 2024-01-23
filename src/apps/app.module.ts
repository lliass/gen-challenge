import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from '../infra/env/env.module';

const relativeRootDir = `${__dirname}/../..`;

@Module({
  imports: [
    EnvModule.setup({
      envFilePath: `${relativeRootDir}/.env`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
