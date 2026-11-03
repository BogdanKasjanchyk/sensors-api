import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTemperatureSensorDto {
  // Обмеження довжини відповідають розміру колонок varchar у БД
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  sensorName: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  unit: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  timestamp?: Date;
}
