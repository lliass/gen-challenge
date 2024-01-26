import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IProduct } from '../Iproduct.entity';
import { Category } from '../../../../category/gateways/database/implementations/category.entity';

@Entity({ name: 'product' })
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
