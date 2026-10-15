import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service.js';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto.js';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto.js';

// Підтримуємо всі варіанти адрес: '/sensors' (ЛР1), '/temperature-sensors' (приклад з коду ЛР3), '/sensor1' (текст Кроку 4 ЛР3)
@Controller(['sensors', 'temperature-sensors', 'sensor1'])
export class TemperatureSensorsController {
  constructor(private readonly sensorsService: TemperatureSensorsService) {}

  @Post()
  create(@Body() createSensorDto: CreateTemperatureSensorDto) {
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
    @Body() updateSensorDto: UpdateTemperatureSensorDto,
  ) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(id);
  }
}
