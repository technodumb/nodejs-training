import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";

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
    entities: [Employee],
});

export default dataSource;
