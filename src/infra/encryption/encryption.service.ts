import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ValidateEncryptedPasswordParameters } from './assets/types/param.type';

@Injectable()
export class EncryptionService {
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    const passwordEncrypted = await bcrypt.hash(password, salt);

    return passwordEncrypted;
  }

  async validateEncryptedPassword(
    params: ValidateEncryptedPasswordParameters,
  ): Promise<boolean> {
    const { forwardedPassword, encryptedPassword } = params;

    const isMatch = await bcrypt.compare(forwardedPassword, encryptedPassword);

    return isMatch;
  }
}
