import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  AuthLoginRequestDTO,
  AuthLoginResponseDTO,
  AuthRegisterRequestDTO,
  AuthRegisterResponseDTO,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(params: AuthLoginRequestDTO): Promise<AuthLoginResponseDTO> {
    const { username, password } = params;

    const user = await this.userService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
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

    const newUser = await this.userService.saveOne({ username, password });

    return { username: newUser.username };
  }
}
