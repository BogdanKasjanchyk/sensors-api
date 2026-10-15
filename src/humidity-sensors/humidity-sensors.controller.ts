import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HumiditySensorsService } from './humidity-sensors.service.js';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto.js';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto.js';

// Підтримуємо '/humidity-sensors' (ЛР1 та код клієнта) і '/sensor2' (текст Кроку 4 ЛР3 для Sensor 2)
@Controller(['humidity-sensors', 'sensor2'])
export class HumiditySensorsController {
  constructor(private readonly sensorsService: HumiditySensorsService) {}

  @Post()
  create(@Body() createSensorDto: CreateHumiditySensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSensorDto: UpdateHumiditySensorDto,
  ) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(id);
  }
}
