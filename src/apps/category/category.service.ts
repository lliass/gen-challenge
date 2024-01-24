import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCategoryRequestDTO,
  CreateCategoryResponseDTO,
  ReadCategoryResponseDTO,
  UpdateCategoryRequestDTO,
} from './category.dto';
import { CategoryRepository } from './gateways/database/implementations/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  async create(
    params: CreateCategoryRequestDTO,
  ): Promise<CreateCategoryResponseDTO> {
    const { name, percentage } = params;

    const categoryFound = await this.categoryRepository.findOne({ name });

    if (categoryFound) {
      throw new BadRequestException('Category already exist');
    }

    const newCategory = await this.categoryRepository.saveOne({
      name,
      percentage,
    });

    return {
      id: newCategory.id,
      name: newCategory.name,
      percentage: newCategory.percentage,
    };
  }

  async listAll(): Promise<ReadCategoryResponseDTO[]> {
    const categorysFound = await this.categoryRepository.find();

    if (categorysFound.length === 0) {
      throw new NotFoundException('No categorys to list');
    }

    return categorysFound;
  }

  async listOne(id: number): Promise<ReadCategoryResponseDTO> {
    const categoryFound = await this.categoryRepository.findOne({ id });

    if (!categoryFound) {
      throw new NotFoundException('Category not found');
    }

    return {
      id: categoryFound.id,
      name: categoryFound.name,
      percentage: categoryFound.percentage,
    };
  }

  async editOne(params: {
    id: number;
    payload: UpdateCategoryRequestDTO;
  }): Promise<void> {
    const {
      id,
      payload: { name, percentage },
    } = params;

    const categoryFound = await this.categoryRepository.findOne({ id });

    if (!categoryFound) {
      throw new NotFoundException('Category not found');
    }

    const categoryFoundWithTheSameName = await this.categoryRepository.findOne({
      name,
    });

    if (!!categoryFoundWithTheSameName) {
      throw new BadRequestException('Name Already in use');
    }

    await this.categoryRepository.updateOne({
      id,
      payload: { name, percentage },
    });
  }

  async deleteOne(id: number): Promise<void> {
    const categoryFound = await this.categoryRepository.findOne({ id });

    if (!categoryFound) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.deleteOne(id);
  }
}
