# nest 学习

## 主要文件说明

1. main.ts: 入口文件。创建nest应用实例。监听端口， 项目初始化操作。
2. app.module.ts: 根模块, 引入整个服务的所有模块
3. *.module.ts: 服务功能模块
4. *.controller.ts: 控制层
5. *.service.ts: 服务层

## 注解

* @Module: 模块，将元数据附加到模块类d
  @Module({
    imports:[] 引入模块
    controllers：[] 控制器
    providers：[ 
      AppService, 
      { 
        provide, 
        useClass
      }
    ] 提供者
    exports：[] 模块共享,其他模块imports该模块的均可以共享exports导出的实例
  })
  @Global() 全局模块, 使模块成为全局作用域,其他模块不用imports即可使用

* @Injectable: 提供者, Providers,  声明该类由nest IOC容器进行管理
* @Controller: 控制器，可设置路由前缀如： @Controller('api')


* @Get: 可设置实际路由路径，如：@Get('list')， 所以该路由完整路由路径为: api/list
* @Post: 
* @Put
* @Delete
* @Req: 将请求对象req注入到处理程序中 @Req() req: Request 或者直接使用@Request()
* @Query() @Param() @Body() @Headers() @Session() @Ip(): 可使用dto方式接收数据 
* @Res: 将请求对象res注入到处理程序中 @Res() res: Response 或者直接使用@Res()
* @Header(): 设置响应头
* @Redirect(url, statusCode): 重定向，跳转, 可以方法动态返回{ url, statusCode}
* @HttpCode 可修改http状态码
* @Catch 捕获异常
* @Inject() 注入
* @Inject(REQUEST) 可在service层获取req对象
* @SetMetadata() 设置标签，将定制元数据附加到路由处理程序的能力

客户请求 --> 中间件 --> 守卫 --> 拦截器开始 --> 管道 --> controller --> 拦截器结束

                       过滤器异常处理

## 中间件 middleware

1. 中间件类需要实现NestMiddleware接口
2. 包含中间件的模块必须实现NestModule接口， 必须使用模块类的configure() 方法来设置
3. 路由可以使用通配符
4. MiddlewareConsumer: 是一个帮助类，提供方法管理中间件
forRoutes() 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类。在大多数情况下，您可能只会传递一个由逗号分隔的控制器列表, 如 forRoutes(UserController);
exclude() 方法排除路由.exclude({ path: 'cats', method: RequestMethod.GET })
5. 多个中间件在 apply() 方法内用逗号
6. 全局中间件： 可在main.ts中，使用app.use()

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
如：nest_study/src/common/middlewares/logger.middleware.ts 请求日志中间

## 异常处理 - 异常过滤器 exception-filter

> 异常过滤器，主要用来统一处理服务的异常错误。

可设置过滤器作用域级别：方法范围，控制器范围或全局范围

1. 实现ExceptionFilter 接口
2. 使用@Catch()装饰器, 参数列表为空，可捕获每一个未处理的异常
3. 使用catch()方法获取异常对象和ArgumentsHost对象
4. @UseFilters() 绑定过滤器, 单个路由，控制器, 如：@UseFilters(HttpExceptionFilter)
5. 全局范围的过滤器：在app.module.ts中， providers中添加APP_FILTER, 可捕获服务所有类型异常
6. 错误地方抛出错误

```
内置HttpException 结构
{
  status, // http状态码
  response:{ // JSON响应体， 可覆盖, 传一个object
    statusCode,
    message
  }
}
eg: throw new HttpException({ code: 2001, message: '无权访问'}, 403)
```

如：nest_study/src/common/filters/any-exception.filter.ts  全局异常捕获过滤器

## 管道 pipe

> 主要用来做 参数校验、参数转换及自定义管道等

可设置管道作用域级别：参数范围、方法范围、控制器范围或全局范围

* 参数校验：对输入的参数进行校验
* 转换：将输入数据转换为所需数据输出(参数转换处理、参数默认值、自定义管道-UserByIdPipe)

1. 实现PipeTransform接口
2. 提供transform() 方法
3. @UsePipes() 绑定管道， 单个路由，控制器，
4. 参数校验：使用基于装饰器的验证， 配合class-validator实现装饰器验证 
  class-validator class-transformer
5. 参数校验的dto使用class-validator的校验规则注解,如: person.dto.ts
6. 设置全局范围的管道：在app.module.ts中， providers中添加APP_PIPE
7. 参数范围：如: @Body(ValidationPipe) createCatDto: CreateCatDto
8. 由管道抛出的异常最后都由异常层(异常过滤器)处理

如：nest_study/src/common/pipes/validate.pipe.ts  参数校验管道

## 守卫 guard

> 主要用来做用户鉴权， 用户是否有访问权限， 如token校验， 用户身份、权限校验等

可设置守卫作用域级别：方法范围、控制器范围或全局范围

1. 实现CanActivate接口
2. 必须实现一个canActivate()函数, 函数接收ExecutionContext实例(执行上下文)。函数返回布尔值
3. @UseGuards() 绑定守卫， 单个路由，控制器
4. 设置全局范围的守卫：在app.module.ts中， providers中添加APP_GUARD
5. 通过`@SetMetadata()` 装饰器将自定义的元数据附加到路由处理程序, 在守卫中通过反射使用`Reflector`帮助类来访问路由通过`SetMetadata`定义的元数据，与实际做对比，来决定守卫的返回值。
6. 由守卫抛出的异常最后都由异常层(异常过滤器)处理

如： nest_study/src/common/guards/auth.guard.ts  token校验守卫

## 拦截器 interceptor

拦截器可以是控制器范围内的, 方法范围内的或者全局范围内的。

1. 使用@Injectable()装饰器注解的类。
2. 实现 NestInterceptor 接口
3. 实现一个intercept()函数, 接收两个参数,第一个是 ExecutionContext 实例, 第二个参数是 CallHandler, 提供handle() 方法，返回一个 Observable, 可用来处理响应的数据
4. @UseInterceptors() 绑定拦截器, 单个路由，控制器
5. 设置全局范围的拦截器：在app.module.ts中， providers中添加APP_INTERCEPTOR

## 配置文件

应用程序通常在不同的环境中运行。根据环境的不同，应该使用不同的配置设置。
在 Nest 中的一个好方法是创建一个 ConfigModule ，它暴露一个 ConfigService ，根据 $NODE_ENV 环境变量加载适当的 .config 文件。


## 调试配置

1.添加配置文件`.vscode/launch.json`，大致如下：
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "nest_project",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/main.ts",
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ],
            "console": "integratedTerminal"
        }
    ]
}

```
2. 建议使用vscode的`Nodejs(preview)`, 可以选择执行的脚本， 通过脚本进行调试

![Alt text](https://docimg8.docs.qq.com/image/zY6Fv6UssXLvc6i3aqpEuw)
![Alt text](https://docimg9.docs.qq.com/image/6q0xzhQT6UIPeoB5cVRKtQ)


// TODO
1.自定义装饰器了解
2.配置文件按运行环境实现
3.框架数据库(sequelize、mongodb等)集成
4.redis集成
5.日志集成
6.第三方服务请求集成
7.yapi生成
