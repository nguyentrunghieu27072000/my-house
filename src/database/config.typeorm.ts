import configuration from '../config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';

const { database } = configuration();

export const AppDataSource = new DataSource({
  type: database.type,
  host: database.host,
  port: parseInt(database.port, 10),
  username: database.username,
  password: database.password,
  database: database.dbName,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
} as DataSourceOptions);
