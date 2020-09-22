import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { UserModule } from './modules/users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AllExceptionFilter } from './common/filters/any-exception.filter';
import { ValidationPipe } from './common/pipes/validate.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [ 
    AppService,
    {
      provide: APP_FILTER,  // 全局范围过滤器，为任何模块设置过滤器
      useClass: AllExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
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
