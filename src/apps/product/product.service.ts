import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
  ReadProductResponseDTO,
  UpdateProductRequestDTO,
  SimulateInstallmentsQueryParamsRequestDTO,
  SimulateInstallmentsResponseDTO,
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
        id: categoryFound.id,
        name: categoryFound.name,
        percentage: categoryFound.percentage,
      },
    };
  }

  async listAll(): Promise<ReadProductResponseDTO[]> {
    const productsFound = await this.productRepository.find();

    if (productsFound.length === 0) {
      throw new NotFoundException('No products to list');
    }

    return productsFound;
  }

  async listOne(id: number): Promise<ReadProductResponseDTO> {
    const productFound = await this.productRepository.findOne({ id });

    if (!productFound) {
      throw new NotFoundException('Product not found');
    }

    return {
      id: productFound.id,
      category_id: productFound.category_id,
      name: productFound.name,
      description: productFound.description,
      value: productFound.value,
      category: {
        id: productFound.category.id,
        name: productFound.category.name,
        percentage: productFound.category.percentage,
      },
    };
  }

  async editOne(params: {
    id: number;
    payload: UpdateProductRequestDTO;
  }): Promise<void> {
    const {
      id,
      payload: { name, description, value },
    } = params;

    const productFound = await this.productRepository.findOne({ id });

    if (!productFound) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.updateOne({
      id,
      payload: { name, description, value },
    });
  }

  async deleteOne(id: number): Promise<void> {
    const productFound = await this.productRepository.findOne({ id });

    if (!productFound) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.deleteOne(id);
  }

  async simulateInstallments(params: {
    id: number;
    queryParams: SimulateInstallmentsQueryParamsRequestDTO;
  }): Promise<SimulateInstallmentsResponseDTO> {
    const {
      id,
      queryParams: { totalInstallments },
    } = params;

    const productFound = await this.productRepository.findOne({ id });

    if (!productFound) {
      throw new NotFoundException('Product not found');
    }

    const {
      value,
      category: { percentage },
    } = productFound;

    const calculationResult = +(
      (value * percentage) /
      (1 - Math.pow(1 + percentage, -totalInstallments))
    ).toFixed(2);

    return {
      name: productFound.name,
      description: productFound.description,
      value: productFound.value,
      totalInstallments: totalInstallments,
      valueOfInstallments: calculationResult,
    };
  }
}
