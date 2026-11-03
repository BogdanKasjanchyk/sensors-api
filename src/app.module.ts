import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { createDatabaseOptions } from './database/database.config.js';
import { TemperatureSensorsModule } from './temperature-sensors/temperature-sensors.module.js';
import { HumiditySensorsModule } from './humidity-sensors/humidity-sensors.module.js';

@Module({
  imports: [
    // Читає .env локально; на Render змінні задаються в розділі Environment
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createDatabaseOptions((key) => configService.get<string>(key)),
    }),
    TemperatureSensorsModule,
    HumiditySensorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
