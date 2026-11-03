import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHumiditySensorDto {
  // Обмеження довжини відповідають розміру колонок varchar у БД
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  sensorName: string;

  // Відносна вологість не може виходити за межі 0–100 %
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  value: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  unit: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  timestamp?: Date;
}
