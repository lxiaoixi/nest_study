import { PersonService } from './service/person.service';
import { UserController } from './user.controller';
import { Module } from "@nestjs/common";

@Module({
  controllers: [UserController],
  providers: [PersonService],
  exports: [PersonService]
})
export class UserModule{} 