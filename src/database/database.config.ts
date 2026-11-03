import type { DataSourceOptions } from 'typeorm';
import { TemperatureSensor } from '../temperature-sensors/entities/temperature-sensor.entity.js';
import { HumiditySensor } from '../humidity-sensors/entities/humidity-sensor.entity.js';
import { InitialSchema1762128000000 } from '../migrations/1762128000000-InitialSchema.js';

type EnvGetter = (key: string) => string | undefined;

/** Спільні параметри БД для застосунку та TypeORM CLI (src/data-source.ts). */
export function createDatabaseOptions(get: EnvGetter): DataSourceOptions {
  const required = (key: string) => {
    const value = get(key);
    if (!value) throw new Error(`Environment variable ${key} is not set`);
    return value;
  };

  return {
    type: 'postgres',
    host: required('DB_HOST'),
    port: Number(get('DB_PORT') ?? 5432),
    username: required('DB_USERNAME'),
    password: required('DB_PASSWORD'),
    database: required('DB_NAME'),
    entities: [TemperatureSensor, HumiditySensor],
    // На продакшені схему змінюють лише міграції: synchronize може безповоротно видалити дані
    synchronize: false,
    migrations: [InitialSchema1762128000000],
    // Безкоштовну БД Render видаляють через місяць, тож нова БД отримає таблиці під час запуску
    migrationsRun: true,
    // Render вимагає SSL для зовнішніх підключень. DB_SSL=false — лише для локального PostgreSQL
    ssl: get('DB_SSL') === 'false' ? false : { rejectUnauthorized: false },
  };
}
