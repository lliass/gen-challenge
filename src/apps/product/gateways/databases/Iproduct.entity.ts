import { ICategory } from '../../../category/gateways/database/Icategory.entity';

export interface IProduct {
  id: number;
  category_id: number;
  name: string;
  description: string;
  value: number;
  category: ICategory;
}
