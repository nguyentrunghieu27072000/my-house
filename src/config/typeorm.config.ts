import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const database = config.get('database');
    return {
      type: database.type,
      host: database.host,
      port: parseInt(database.port, 10),
      username: database.username,
      password: database.password,
      database: database.dbName,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: false,
      migrations: [__dirname + '/../database/migrations/*.ts'],
    };
  },
};
