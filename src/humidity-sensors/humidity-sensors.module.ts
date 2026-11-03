import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HumiditySensorsService } from './humidity-sensors.service.js';
import { HumiditySensorsController } from './humidity-sensors.controller.js';
import { HumiditySensor } from './entities/humidity-sensor.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([HumiditySensor])],
  controllers: [HumiditySensorsController],
  providers: [HumiditySensorsService],
})
export class HumiditySensorsModule {}
