import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ICategory } from '../Icategory.entity';
import { Product } from '../../../../product/gateways/databases/implementations/product.entity';

@Entity({ name: 'category' })
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  percentage: number;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
