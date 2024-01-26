import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  AuthLoginRequestDTO,
  AuthLoginResponseDTO,
  AuthRegisterRequestDTO,
  AuthRegisterResponseDTO,
} from './auth.dto';
import { EncryptionService } from '../../infra/encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptionService: EncryptionService,
  ) {}

  async signIn(params: AuthLoginRequestDTO): Promise<AuthLoginResponseDTO> {
    const { username, password } = params;

    const user = await this.userService.findOne(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const validatedPassword =
      await this.encryptionService.validateEncryptedPassword({
        forwardedPassword: password,
        encryptedPassword: user.password,
      });

    if (!validatedPassword) {
      throw new BadRequestException('Credentials are incorrect');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    params: AuthRegisterRequestDTO,
  ): Promise<AuthRegisterResponseDTO> {
    const { username, password } = params;

    const user = await this.userService.findOne(username);

    if (!!user) {
      throw new BadRequestException('User already exist');
    }

    const encryptedPassword = await this.encryptionService.encryptPassword(
      password,
    );

    const newUser = await this.userService.saveOne({
      username,
      password: encryptedPassword,
    });

    return { username: newUser.username };
  }
}
