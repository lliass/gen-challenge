import { IUser } from './Iuser.entity';

interface IUserRepository {
  saveOne(payload: Partial<IUser>): Promise<IUser>;
  findOne(payload: Partial<IUser>): Promise<IUser | null>;
}

export { IUserRepository };
