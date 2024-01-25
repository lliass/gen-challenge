import { ICategory } from './Icategory.entity';

interface ICategoryRepository {
  saveOne(payload: Partial<ICategory>): Promise<ICategory>;
  findOne(payload: Partial<ICategory>): Promise<ICategory | null>;
  find(): Promise<ICategory[]>;
  updateOne(params: {
    id: number;
    payload: Partial<ICategory>;
  }): Promise<boolean>;
  deleteOne(id: number): Promise<boolean>;
}

export { ICategoryRepository };
