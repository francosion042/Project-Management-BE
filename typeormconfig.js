"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const snake_naming_strategy_1 = require("./src/snake-naming.strategy");
dotenv_1.default.config();
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
    subscribers: ['src/modules/**/*.subscriber{.ts,.js}'],
    entities: [
        'src/modules/**/*.entity{.ts,.js}',
        'src/modules/**/*.view-entity{.ts,.js}',
    ],
    migrations: ['src/database/migrations/*{.ts,.js}'],
});
exports.default = dataSource;
//# sourceMappingURL=typeormconfig.js.map