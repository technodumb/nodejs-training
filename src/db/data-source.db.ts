import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5435,
    database: "training",
    username: "alnas1",
    password: "dockerpass",
    extra: { max: 5, min: 2 },
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ["./dist/src/entity/*.js"],
    migrations: ["./dist/src/db/migrations/*.js"],
});

export default dataSource;
