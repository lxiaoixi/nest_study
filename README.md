# nest 学习

## 主要文件说明

main.ts: 入口文件。创建nest应用实例。监听端口， 项目初始化操作。
app.module.ts: 根模块, 引入整个服务的所有模块
*.module.ts: 服务功能模块
*.controller.ts: 控制层
*.service.ts: 服务层


控制器属于模块

## 注解

@Module: 模块，将元数据附加到模块类d
@Module({
  imports:[] 引入模块
  controllers：[] 控制器
  providers：[AppService, {provide, useClass}] 提供者
  exports：[] 模块共享,其他模块imports该模块的均可以共享exports导出的实例
})
@Global() 全局模块, 使模块成为全局作用域,其他模块不用imports即可使用
@Controller: 控制器，可设置路由前缀如： @Controller('api')
@Injectable: 提供者, Providers,  声明该类由nest IOC容器进行管理

@Get: 可设置实际路由路径，如：@Get('list')， 所以该路由完整路由路径为: api/list
@Post: 
@Put
@Delete
@Req: 将请求对象req注入到处理程序中 @Req() req: Request 或者直接使用@Request()
@Query() @Param() @Body() @Headers() @Session() @Ip(): 可使用dto方式接收数据 
@Res: 将请求对象res注入到处理程序中 @Res() req: Response 或者直接使用@Res()
@Header(): 设置响应头
@Redirect(url, statusCode): 重定向，跳转, 可以方法动态返回{ url, statusCode}
@HttpCode 可修改http状态码
