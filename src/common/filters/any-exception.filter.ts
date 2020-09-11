import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    console.log(request.url, exception)

    const status = exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorData = exception instanceof HttpException
    ? exception.getResponse()
    : '服务器开小差'

    console.log(errorData)

    response.status(status).json({
      code: (errorData as any).code || 1001,
      message: (errorData as any).message || '服务器开小差',
    })
  }
}