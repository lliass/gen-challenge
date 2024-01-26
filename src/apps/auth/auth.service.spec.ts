import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { IUser } from '../user/gateways/database/Iuser.entity';
import { UserRepository } from '../user/gateways/database/implementations/user.repository';
import { MockUserRepository } from '../user/gateways/database/__mocks__/mock-user.repository';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../../infra/encryption/encryption.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useClass: MockUserRepository },
        UserService,
        JwtService,
        EncryptionService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new User', async () => {
    const newUser: Partial<IUser> = {
      username: 'userTest',
      password: 'passwordTest',
    };

    const newUserRegistered = await service.register({
      username: newUser.username,
      password: newUser.password,
    });

    expect(newUserRegistered.username).toBe('userTest');
  });

  it('should not create a new User, because the name is already in use', async () => {
    const newUser: Partial<IUser> = {
      username: 'userTest',
      password: 'passwordTest',
    };

    await expect(
      service.register({
        username: newUser.username,
        password: newUser.password,
      }),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should create a new Login', async () => {
    const newUser: Partial<IUser> = {
      username: 'userTest',
      password: 'passwordTest',
    };

    jest.spyOn(service, 'signIn').mockImplementation(async () => ({
      token: 'tokenTest',
    }));

    expect(
      await service.signIn({
        username: newUser.username,
        password: newUser.password,
      }),
    ).toHaveProperty('token');
  });

  it('should not create a new Login, because the username does not exist', async () => {
    const newUser: Partial<IUser> = {
      username: 'userTestNotFound',
      password: 'passwordTestNotFound',
    };

    await expect(
      service.signIn({
        username: newUser.username,
        password: newUser.password,
      }),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should not create a new User, because the password is incorrect', async () => {
    const newUser: Partial<IUser> = {
      username: 'userTest',
      password: 'wrongPassword',
    };

    await expect(
      service.signIn({
        username: newUser.username,
        password: newUser.password,
      }),
    ).rejects.toThrowError(BadRequestException);
  });
});
