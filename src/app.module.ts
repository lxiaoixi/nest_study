import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AllExceptionFilter } from './common/filters/any-exception.filter';


@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [ 
    AppService,
    {
      provide: APP_FILTER,  // 全局范围过滤器，为任何模块设置过滤器
      useClass: AllExceptionFilter
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { // 使用中间件
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
