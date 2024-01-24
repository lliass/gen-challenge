import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModuleOptions } from './assets/types/config.type';

@Module({})
export class EnvModule {
  static setup(options: EnvModuleOptions): DynamicModule {
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
