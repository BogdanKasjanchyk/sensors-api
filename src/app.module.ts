import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TemperatureSensorsModule } from './temperature-sensors/temperature-sensors.module.js';
import { HumiditySensorsModule } from './humidity-sensors/humidity-sensors.module.js';

@Module({
  imports: [TemperatureSensorsModule, HumiditySensorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
