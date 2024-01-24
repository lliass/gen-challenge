import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './gateways/database/implementations/category.entity';
import { CategoryRepository } from './gateways/database/implementations/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
