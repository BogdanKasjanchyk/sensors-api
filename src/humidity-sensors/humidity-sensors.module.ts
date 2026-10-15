import { Module } from '@nestjs/common';
import { HumiditySensorsService } from './humidity-sensors.service.js';
import { HumiditySensorsController } from './humidity-sensors.controller.js';

@Module({
  controllers: [HumiditySensorsController],
  providers: [HumiditySensorsService],
})
export class HumiditySensorsModule {}
