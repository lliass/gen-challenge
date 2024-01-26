import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUserRepository } from '../Iuser.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async saveOne(payload: Partial<User>): Promise<User> {
    const result = await this.repository.save(payload);

    return result;
  }

  async findOne(payload: Partial<User>): Promise<User> {
    const result = await this.repository.findOne({
      where: { ...payload },
    });

    return result;
  }
}
