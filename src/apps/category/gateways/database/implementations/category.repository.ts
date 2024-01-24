import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { ICategoryRepository } from '../Icategory.repository';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async saveOne(payload: Partial<Category>): Promise<Category> {
    const result = await this.repository.save(payload);

    return result;
  }

  async find(): Promise<Category[]> {
    const result = await this.repository.find();

    return result;
  }

  async findOne(payload: Partial<Category>): Promise<Category> {
    const result = await this.repository.findOne({
      where: { ...payload },
    });

    return result;
  }

  async updateOne(params: {
    id: number;
    payload: Partial<Category>;
  }): Promise<boolean> {
    const { id, payload } = params;

    const result = await this.repository.update(id, payload);

    return !!result.affected;
  }

  async deleteOne(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);

    return !!result.affected;
  }
}
