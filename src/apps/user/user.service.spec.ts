import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './gateways/database/implementations/user.repository';
import { MockUserRepository } from './gateways/database/__mocks__/mock-user.repository';
import { IUser } from './gateways/database/Iuser.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new User', async () => {
    const newUser: Partial<IUser> = {
      username: 'newUser',
      password: 'newPassword',
    };

    const newUserCreated = await service.saveOne(newUser);

    expect(newUserCreated.username).toBe('newUser');
  });

  it('should found a User', async () => {
    const userFound = await service.findOne('newUser');

    expect(userFound).toEqual({
      id: 2,
      username: 'newUser',
      password: 'newPassword',
    });
  });
});
