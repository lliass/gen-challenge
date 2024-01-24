import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICategory } from '../Icategory.entity';

@Entity({ name: 'category' })
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  percentage: number;
}
