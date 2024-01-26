import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/gateways/database/implementations/user.repository';
import { MockUserRepository } from '../user/gateways/database/__mocks__/mock-user.repository';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../../infra/encryption/encryption.service';

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
});
