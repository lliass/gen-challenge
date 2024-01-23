import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../Iuser.entity';

@Entity({ name: 'userlogin' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
