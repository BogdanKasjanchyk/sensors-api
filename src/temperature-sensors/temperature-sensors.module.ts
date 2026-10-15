import { Module } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service.js';
import { TemperatureSensorsController } from './temperature-sensors.controller.js';

@Module({
  controllers: [TemperatureSensorsController],
  providers: [TemperatureSensorsService],
})
export class TemperatureSensorsModule {}
