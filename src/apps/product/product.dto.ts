import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  IsPositive,
  IsOptional,
  Max,
} from 'class-validator';

import { Type } from 'class-transformer';

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
    id: number;
    name: string;
    percentage: number;
  };
}

interface ReadProductResponseDTO {
  id: number;
  category_id: number;
  name: string;
  description: string;
  value: number;
  category: {
    id: number;
    name: string;
    percentage: number;
  };
}

class UpdateProductRequestDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;
}

class SimulateInstallmentsQueryParamsRequestDTO {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(12)
  totalInstallments: number;
}

class SimulateInstallmentsResponseDTO {
  name: string;
  description: string;
  value: number;
  totalInstallments: number;
  valueOfInstallments: number;
}

export {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
  ReadProductResponseDTO,
  UpdateProductRequestDTO,
  SimulateInstallmentsQueryParamsRequestDTO,
  SimulateInstallmentsResponseDTO,
};
