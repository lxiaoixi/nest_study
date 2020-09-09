# nest 学习

## 主要文件说明

main.ts: 入口文件。创建nest应用实例。监听端口， 项目初始化操作。
controller.ts: 控制层
service.ts: 服务层
module.ts: 模块

## 注解

@Module
@Controller: 可设置路由前缀如： @Controller('api')
@Injectable
@Get: 可设置实际路由路径，如：@Get('list')， 所以该路由完整路由路径为: api/list
@Post: 
@Put
@Delete
@Req: 将请求对象req注入到处理程序中 @Req() req: Request 或者直接使用@Request()
@Query() @Param() @Body() @Headers() @Session() @Ip()

@HttpCode 可修改http状态码