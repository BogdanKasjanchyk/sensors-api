import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHumiditySensorDto {
  @IsNotEmpty()
  @IsString()
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
  unit: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  timestamp?: Date;
}
