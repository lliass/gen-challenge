import { Injectable } from '@nestjs/common';
import { UserRepository } from './gateways/database/implementations/user.repository';
import { User } from './gateways/database/implementations/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(username: string): Promise<User | undefined> {
    const result = await this.userRepository.findOne({ username });
    return result;
  }

  async saveOne(payload: Partial<User>): Promise<User> {
    const result = await this.userRepository.saveOne(payload);
    return result;
  }
}
