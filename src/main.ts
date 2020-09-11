import { AppService } from './app.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);  // 使用express框架
  const appService = app.select(AppModule).get(AppService, { strict: true})  // 引用注册的某个实例
  appService.init()
  await app.listen(3000);
  process.on('SIGINT', async() => {
    await app.close()
    process.exit()
  })
}
bootstrap();
