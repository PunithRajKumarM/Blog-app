import "reflect-metadata";
import { DataSource } from "typeorm";
import { Blog } from "./entity/Blog";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "blogs",
  synchronize: true,
  logging: true,
  entities: [Blog],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
