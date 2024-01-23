import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as _ from 'lodash';

type IClassConstructor = new (...args: any[]) => unknown;

@Module({})
export class PostgresDBModule {
  static registeredEntities: IClassConstructor[] = [];

  static setup(entities: IClassConstructor[]): DynamicModule {
    const updatedUniqueEntities = _.uniqWith([
      ...this.registeredEntities,
      ...entities,
    ]);

    this.registeredEntities = updatedUniqueEntities;

    return {
      module: PostgresDBModule,
      imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return {
              type: 'postgres',
              host: configService.get('POSTGRES_DB_HOST'),
              port: +configService.get('POSTGRES_DB_PORT'),
              username: configService.get('POSTGRES_DB_USER'),
              password: configService.get('POSTGRES_DB_PASS'),
              database: configService.get('POSTGRES_DB_NAME'),
              entities,
              verboseRetryLog: true,
            };
          },
        }),
      ],
    };
  }
}
