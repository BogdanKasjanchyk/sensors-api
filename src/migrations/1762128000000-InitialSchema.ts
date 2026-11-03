import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1762128000000 implements MigrationInterface {
  name = 'InitialSchema1762128000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE "temperature-sensors" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "sensorName" character varying(200) NOT NULL,
        "value" double precision NOT NULL,
        "unit" character varying(20),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_temperature_sensors_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "humidity-sensors" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "sensorName" character varying(200) NOT NULL,
        "value" double precision NOT NULL,
        "unit" character varying(20),
        "location" character varying(200),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_humidity_sensors_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "humidity-sensors"`);
    await queryRunner.query(`DROP TABLE "temperature-sensors"`);
  }
}
