import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    extra: { max: 5, min: 2 },
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ["./dist/src/entity/*.js"],
    migrations: ["./dist/src/db/migrations/*.js"],
});

export default dataSource;
