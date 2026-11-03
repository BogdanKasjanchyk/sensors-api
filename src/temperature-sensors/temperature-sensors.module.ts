import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureSensorsService } from './temperature-sensors.service.js';
import { TemperatureSensorsController } from './temperature-sensors.controller.js';
import { TemperatureSensor } from './entities/temperature-sensor.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([TemperatureSensor])],
  controllers: [TemperatureSensorsController],
  providers: [TemperatureSensorsService],
})
export class TemperatureSensorsModule {}
