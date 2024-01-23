import { IsNotEmpty, IsString } from 'class-validator';

class AuthLoginRequestDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

interface AuthLoginResponseDTO {
  token: string;
}

class AuthRegisterRequestDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

class AuthRegisterResponseDTO {
  username: string;
}

export {
  AuthLoginRequestDTO,
  AuthLoginResponseDTO,
  AuthRegisterRequestDTO,
  AuthRegisterResponseDTO,
};
