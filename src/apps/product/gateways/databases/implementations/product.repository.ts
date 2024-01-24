import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { IProductRepository } from '../Iproduct.repository';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  async saveOne(payload: Partial<Product>): Promise<Product> {
    const result = await this.repository.save(payload);

    return result;
  }

  async find(): Promise<Product[]> {
    const result = await this.repository.find();

    return result;
  }

  async findOne(payload: Partial<Product>): Promise<Product> {
    const result = await this.repository.findOne({
      where: { ...payload },
    });

    return result;
  }

  async updateOne(params: {
    id: number;
    payload: Partial<Product>;
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
