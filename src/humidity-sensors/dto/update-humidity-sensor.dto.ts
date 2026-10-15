import { PartialType } from '@nestjs/mapped-types';
import { CreateHumiditySensorDto } from './create-humidity-sensor.dto.js';

export class UpdateHumiditySensorDto extends PartialType(
  CreateHumiditySensorDto,
) {}
