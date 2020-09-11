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

@Injectable: 提供者, Providers,  声明该类由nest IOC容器进行管理
@Controller: 控制器，可设置路由前缀如： @Controller('api')


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

# 中间件

1.中间件类需要实现NestMiddleware接口
2.包含中间件的模块必须实现NestModule接口， 必须使用模块类的configure() 方法来设置
3.路由可以使用通配符
4.MiddlewareConsumer: 是一个帮助类，提供方法管理中间件
forRoutes() 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类。在大多数情况下，您可能只会传递一个由逗号分隔的控制器列表, 如 forRoutes(UserController);
exclude() 方法排除路由.exclude({ path: 'cats', method: RequestMethod.GET })
5.多个中间件在 apply() 方法内用逗号
5.全局中间件： 可在main.ts中，使用app.use()

```
@Module()
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*') // forRoutes({ path: 'api', method: RequestMethod.GET}), 指定中间件使用的路由
  }
}
```

# 异常处理 - 异常过滤器
可设置过滤器作用域级别：方法范围，控制器范围或全局范围

1.实现ExceptionFilter 接口
2.使用@Catch()装饰器, 参数列表为空，可捕获每一个未处理的异常
3.使用catch()方法获取异常对象和ArgumentsHost对象
4.@UseFilters() 绑定过滤器
5.全局范围的过滤器：在app.module.ts中， providers中添加APP_FILTER, 加上@Catch()参数列表为空，可捕获服务所有类型异常

内置HttpException 结构
{
  status, // http状态码
  response:{ // JSON响应体， 可覆盖, 传一个object
    statusCode,
    message
  }
}
eg: throw new HttpException({ code: 2001, message: '无权访问'}, 403)

