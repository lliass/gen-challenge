import { IsNotEmpty, IsString } from 'class-validator';

class AuthLoginRequestDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

interface UserLoginResponseDTO {
  token: string;
}

export { AuthLoginRequestDTO, UserLoginResponseDTO };
