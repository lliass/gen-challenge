import { IProduct } from '../../../product/gateways/databases/Iproduct.entity';

export interface ICategory {
  id: number;
  name: string;
  percentage: number;
  products?: IProduct[];
}
