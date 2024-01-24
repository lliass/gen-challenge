import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { EncryptionModule } from '../../infra/encryption/encryption.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_TOKEN,
        signOptions: { expiresIn: '12h' },
      }),
    }),
    EncryptionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: JwtGuard }],
  exports: [AuthService],
})
export class AuthModule {}
