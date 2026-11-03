import 'dotenv/config';
import { DataSource } from 'typeorm';
import { createDatabaseOptions } from './database/database.config.js';

// Точка входу для TypeORM CLI (npm run migration:*)
export default new DataSource(createDatabaseOptions((key) => process.env[key]));
