import { IProduct } from './Iproduct.entity';

interface IProductRepository {
  saveOne(payload: Partial<IProduct>): Promise<IProduct>;
  findOne(payload: Partial<IProduct>): Promise<IProduct | null>;
  find(): Promise<IProduct[]>;
  updateOne(params: {
    id: number;
    payload: Partial<IProduct>;
  }): Promise<boolean>;
  deleteOne(id: number): Promise<boolean>;
}

export { IProductRepository };
