import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from '../infra/env/env.module';
import { AuthModule } from './auth/auth.module';
import { PostgresDBModule } from '../infra/persistence/postgres/postgres-db.module';
import { User } from './user/gateways/database/implementations/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/gateways/database/implementations/category.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/gateways/databases/implementations/product.entity';

const relativeRootDir = `${__dirname}/../..`;

@Module({
  imports: [
    EnvModule.setup({
      isGlobal: true,
      envFilePath: `${relativeRootDir}/.env`,
    }),

    PostgresDBModule.setup([User, Category, Product]),

    AuthModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
