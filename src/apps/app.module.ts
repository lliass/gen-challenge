import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from '../infra/env/env.module';
import { AuthModule } from './auth/auth.module';
import { PostgresDBModule } from '../infra/persistence/postgres/postgres-db.module';
import { User } from './user/gateways/database/implementations/user.entity';

const relativeRootDir = `${__dirname}/../..`;

@Module({
  imports: [
    EnvModule.setup({
      isGlobal: true,
      envFilePath: `${relativeRootDir}/.env`,
    }),

    PostgresDBModule.setup([User]),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
