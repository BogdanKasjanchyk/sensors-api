import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { TemperatureSensor } from './entities/temperature-sensor.entity.js';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto.js';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto.js';

@Injectable()
export class TemperatureSensorsService {
  private sensors: TemperatureSensor[] = [];

  create(createSensorDto: CreateTemperatureSensorDto): TemperatureSensor {
    const sensor: TemperatureSensor = {
      ...createSensorDto,
      id: uuidv4(),
      timestamp: new Date(),
    };
    this.sensors.push(sensor);
    return sensor;
  }

  findAll(): TemperatureSensor[] {
    return this.sensors;
  }

  findOne(id: string): TemperatureSensor {
    const sensor = this.sensors.find((s) => s.id === id);
    if (!sensor) throw new NotFoundException(`sensor with id ${id} not found`);
    return sensor;
  }

  update(
    id: string,
    updateSensorDto: UpdateTemperatureSensorDto,
  ): TemperatureSensor {
    const sensor = this.findOne(id);
    Object.assign(sensor, updateSensorDto);
    return sensor;
  }

  remove(id: string): void {
    const sensor = this.findOne(id);
    this.sensors = this.sensors.filter((s) => s.id !== sensor.id);
  }
}
