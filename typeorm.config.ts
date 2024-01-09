import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  subscribers: ['src/modules/**/*.subscriber{.ts,.js}'],
  entities: [
    'src/modules/**/entities/*.entity{.ts,.js}',
    'src/modules/**/entities/*.view-entity{.ts,.js}',
  ],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
