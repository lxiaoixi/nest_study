import { Controller, Get, Post, Req, Body, Param } from "@nestjs/common";
import { Request } from 'express';

@Controller('api')
export class ApiController {
  @Get()
  Index(): string {
    return 'the action returns all list'
  }

  @Get('list') 
  async findAll(): Promise<any> {  // async 返回值是Promise
    return "return promise"
  }

  
  @Get('item')
  fingItmeList(): string {
    return 'this is item list'
  }

  @Get(':id')
  findById(@Req() req: Request, @Param() params): string {
    console.log(req.params)  // 获取请求对象req
    console.log(req.query)
    console.log(params.id)
    return 'this action returns item by id'
  }

  @Post('item')
  create(@Body() body: JSON): string {
    console.log(body)
    return 'add a new item'
  }

}