import { Injectable } from '@nestjs/common';
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
} from './product.dto';
import { CategoryService } from '../category/category.service';
import { ProductRepository } from './gateways/databases/implementations/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private categoryService: CategoryService,
    private productRepository: ProductRepository,
  ) {}

  async create(
    payload: CreateProductRequestDTO,
  ): Promise<CreateProductResponseDTO> {
    const { name, description, value, categoryName } = payload;

    const categoryFound = await this.categoryService.findOneByName(
      categoryName,
    );

    const newProduct = await this.productRepository.saveOne({
      name,
      category_id: categoryFound.id,
      description,
      value,
    });

    return {
      id: newProduct.id,
      category_id: categoryFound.id,
      name: newProduct.name,
      description: newProduct.description,
      value: newProduct.value,
      category: {
        name: categoryFound.name,
      },
    };
  }
}
