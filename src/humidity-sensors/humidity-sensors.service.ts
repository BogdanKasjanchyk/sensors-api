import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HumiditySensor } from './entities/humidity-sensor.entity.js';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto.js';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto.js';

@Injectable()
export class HumiditySensorsService {
  constructor(
    @InjectRepository(HumiditySensor)
    private readonly humiditySensorRepository: Repository<HumiditySensor>,
  ) {}

  async create(createDto: CreateHumiditySensorDto) {
    const record = this.humiditySensorRepository.create(createDto);
    return await this.humiditySensorRepository.save(record);
  }

  async findAll() {
    return await this.humiditySensorRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async findOne(id: string) {
    const record = await this.humiditySensorRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException(`humidity sensor with id ${id} not found`);
    }
    return record;
  }

  async update(id: string, updateDto: UpdateHumiditySensorDto) {
    const record = await this.findOne(id);
    this.humiditySensorRepository.merge(record, updateDto);
    return await this.humiditySensorRepository.save(record);
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    await this.humiditySensorRepository.remove(record);
  }
}
