import { CreateDto } from './dto/create.dto';
import { PersonService } from './service/person.service';
import { PersonDto } from './dto/person.dto';
import { Controller, Get, Post, Req, Body, Param, Put, Delete, UnauthorizedException, HttpException, ParseIntPipe, SetMetadata, UseInterceptors } from "@nestjs/common";
import { Request } from 'express';
import { Person } from './interfaces/person.interface';
import { BusinessException, errorType } from 'src/common/filters/business-exception';

@Controller('api')
export class UserController {
  constructor(private personService: PersonService) {} // 基于构造函数的注入

  @Get()
  @SetMetadata('ignoreAuthGuard', true)
  Index(): string {
    return 'the action returns all list'
  }

  @Get('list') 
  @SetMetadata('ignoreAuthGuard', true)
  async findAll(): Promise<any> {  // async 返回值是Promise
    return "return promise"
  }

  @Get('user')
  @SetMetadata('ignoreAuthGuard', true)
  async fingUserList(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  @SetMetadata('ignoreAuthGuard', true)
  findById(@Req() req: Request, @Param() params): string {
    console.log(req.params)  // 获取请求对象req
    console.log(req.query)
    console.log(params.id)
    return 'this action returns item by id'
  }

  @Post('user')
  async create(@Body() personDto: PersonDto): Promise<string> {
    // await new Promise((resolve)=>{setTimeout(resolve, 5000)}) 测试请求超时异常处理
    console.log(personDto)
    console.log(personDto.name)
    if(personDto.name === 'test'){
      //throw new UnauthorizedException({ code: 2001, message: '无权访问'})
      //throw new HttpException({ code: 2001, message: '无权访问'}, 403)
      throw new BusinessException(errorType.ACCESS_DENIED, '无权访问')
    }
    this.personService.create(personDto)
    return 'add a new user'
  }

  @Put('user/:id')
  update(@Param('id', ParseIntPipe) id, @Body() updateDto: PersonDto) {

    console.log(id)
    console.log(updateDto)
    return `this action update a ${id} user`
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    console.log(id)
    return `this action delete a ${id} user`
  }

  @Post('ceshi')
  async ceshi(@Body() data: CreateDto) {
    console.log(99999, data)
    return 1
  }
}