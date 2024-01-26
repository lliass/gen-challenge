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
  Query,
} from '@nestjs/common';
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
  ReadProductResponseDTO,
  UpdateProductRequestDTO,
  SimulateInstallmentsQueryParamsRequestDTO,
  SimulateInstallmentsResponseDTO,
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

  @HttpCode(HttpStatus.OK)
  @Get('')
  async listAll(): Promise<ReadProductResponseDTO[]> {
    return this.productService.listAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async listOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadProductResponseDTO> {
    return this.productService.listOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/:id')
  async editOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductRequestDTO,
  ): Promise<void> {
    await this.productService.editOne({ id, payload: body });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productService.deleteOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id/simulate-installments')
  async simulateInstallments(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: SimulateInstallmentsQueryParamsRequestDTO,
  ): Promise<SimulateInstallmentsResponseDTO> {
    return this.productService.simulateInstallments({ id, queryParams });
  }
}
