import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

type IEnvModuleOptions = Parameters<typeof ConfigModule.forRoot>[0];

@Module({})
export class EnvModule {
  static setup(options: IEnvModuleOptions): DynamicModule {
    return {
      module: EnvModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: options.envFilePath,
        }),
      ],
      exports: [ConfigModule],
    };
  }
}
