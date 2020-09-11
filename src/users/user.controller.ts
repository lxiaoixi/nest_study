import { PersonService } from './service/person.service';
import { PersonDto } from './dto/person.dto';
import { Controller, Get, Post, Req, Body, Param, Put, Delete } from "@nestjs/common";
import { Request } from 'express';
import { Person } from './interfaces/person.interface';

@Controller('api')
export class UserController {
  constructor(private personService: PersonService) {} // 基于构造函数的注入

  @Get()
  Index(): string {
    return 'the action returns all list'
  }

  @Get('list') 
  async findAll(): Promise<any> {  // async 返回值是Promise
    return "return promise"
  }

  @Get('user')
  async fingUserList(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  findById(@Req() req: Request, @Param() params): string {
    console.log(req.params)  // 获取请求对象req
    console.log(req.query)
    console.log(params.id)
    return 'this action returns item by id'
  }

  @Post('user')
  create(@Body() personDto: PersonDto): string {
    console.log(personDto)
    console.log(personDto.name)
    this.personService.create(personDto)
    return 'add a new user'
  }

  @Put('user/:id')
  update(@Param('id') id: string, @Body() updateDto: PersonDto) {

    console.log(id)
    console.log(updateDto)
    return `this action update a ${id} user`
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    console.log(id)
    return `this action delete a ${id} user`
  }
}