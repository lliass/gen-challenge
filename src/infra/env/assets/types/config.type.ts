import { ConfigModule } from '@nestjs/config';

export type EnvModuleOptions = Parameters<typeof ConfigModule.forRoot>[0];
