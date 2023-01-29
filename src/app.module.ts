import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    AuthModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
