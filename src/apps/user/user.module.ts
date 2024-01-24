import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './gateways/database/implementations/user.entity';
import { UserRepository } from './gateways/database/implementations/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
