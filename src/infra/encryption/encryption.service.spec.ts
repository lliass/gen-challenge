import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService],
    }).compile();
    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt a password', async () => {
    const newPassword = 'testPassword';

    const encryptedPassword = await service.encryptPassword(newPassword);

    expect(encryptedPassword.length).toBeGreaterThan(0);
  });

  it('should validate a encrypt password', async () => {
    const passwordToVerify = 'testPassword';
    const encryptedPasswordToVerify =
      '$2b$10$T/5SqS/IvAFiKxF4iCt1Jeql8bfYMesF4mfhfPFJRuyjck8E/45xm';

    const passwordValidated = await service.validateEncryptedPassword({
      forwardedPassword: passwordToVerify,
      encryptedPassword: encryptedPasswordToVerify,
    });

    expect(passwordValidated).toEqual(true);
  });

  it('should not validate a encrypt password', async () => {
    const passwordToVerify = 'testPassword';
    const encryptedPasswordToVerify =
      '$2b$10iCt1Jeql8bfYMesF4mfhfPFJRuyjck8E/45xm';

    const passwordValidated = await service.validateEncryptedPassword({
      forwardedPassword: passwordToVerify,
      encryptedPassword: encryptedPasswordToVerify,
    });

    expect(passwordValidated).toEqual(false);
  });
});
