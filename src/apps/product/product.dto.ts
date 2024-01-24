import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  IsPositive,
  IsOptional,
} from 'class-validator';

class CreateProductRequestDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsString()
  categoryName: string;
}

interface CreateProductResponseDTO {
  id: number;
  category_id: number;
  name: string;
  description: string;
  value: number;
  category: {
    name: string;
  };
}

export { CreateProductRequestDTO, CreateProductResponseDTO };
