import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../Iproduct.entity';

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
}
