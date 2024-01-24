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
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
} from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(
    @Body() body: CreateProductRequestDTO,
  ): Promise<CreateProductResponseDTO> {
    return this.productService.create(body);
  }
}
