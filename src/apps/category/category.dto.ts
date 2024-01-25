import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Max,
  MaxLength,
  IsPositive,
  IsOptional,
} from 'class-validator';

class CreateCategoryRequestDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(99)
  percentage: number;
}

interface CreateCategoryResponseDTO {
  id: number;
  name: string;
  percentage: number;
}

interface ReadCategoryResponseDTO {
  id: number;
  name: string;
  percentage: number;
}

class UpdateCategoryRequestDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(99)
  percentage: number;
}

export {
  CreateCategoryRequestDTO,
  CreateCategoryResponseDTO,
  ReadCategoryResponseDTO,
  UpdateCategoryRequestDTO,
};
