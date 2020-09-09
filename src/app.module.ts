import { ApiController } from './api.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
