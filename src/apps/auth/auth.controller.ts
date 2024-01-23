import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthLoginRequestDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './assets/metadatas/public.metadata';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() body: AuthLoginRequestDTO) {
    return this.authService.signIn(body);
  }
}
