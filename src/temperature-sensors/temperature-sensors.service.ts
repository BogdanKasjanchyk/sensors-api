import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureSensor } from './entities/temperature-sensor.entity.js';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto.js';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto.js';

@Injectable()
export class TemperatureSensorsService {
  constructor(
    @InjectRepository(TemperatureSensor)
    private readonly temperatureSensorRepository: Repository<TemperatureSensor>,
  ) {}

  async create(createDto: CreateTemperatureSensorDto) {
    const record = this.temperatureSensorRepository.create(createDto);
    return await this.temperatureSensorRepository.save(record);
  }

  async findAll() {
    return await this.temperatureSensorRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async findOne(id: string) {
    const record = await this.temperatureSensorRepository.findOneBy({ id });
    if (!record) throw new NotFoundException(`sensor with id ${id} not found`);
    return record;
  }

  async update(id: string, updateDto: UpdateTemperatureSensorDto) {
    const record = await this.findOne(id);
    this.temperatureSensorRepository.merge(record, updateDto);
    return await this.temperatureSensorRepository.save(record);
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    await this.temperatureSensorRepository.remove(record);
  }
}
