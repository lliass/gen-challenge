import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryRequestDTO,
  CreateCategoryResponseDTO,
  ReadCategoryResponseDTO,
  UpdateCategoryRequestDTO,
} from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(
    @Body() body: CreateCategoryRequestDTO,
  ): Promise<CreateCategoryResponseDTO> {
    return this.categoryService.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  async listAll(): Promise<ReadCategoryResponseDTO[]> {
    return this.categoryService.listAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async listOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadCategoryResponseDTO> {
    return this.categoryService.listOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/:id')
  async editOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryRequestDTO,
  ): Promise<void> {
    await this.categoryService.editOne({ id, payload: body });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.categoryService.deleteOne(id);
  }
}
