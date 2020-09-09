import { Controller, Get, Post, Req, Body } from "@nestjs/common";
import { Request } from 'express';

@Controller('api')
export class ApiController {
  @Get()
  findAll(): string {
    return 'the action returns all list'
  }
  
  @Get('item')
  fingItmeList(): string {
    return 'this is item list'
  }

  @Get(':id')
  findById(@Req() req: Request): string {
    console.log(req.params)  // 获取请求对象req
    console.log(req.query)
    return 'this action returns item by id'
  }

  @Post('item')
  create(@Body() body: JSON): string {
    console.log(body)
    return 'add a new item'
  }

}