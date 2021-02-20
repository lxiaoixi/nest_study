import { AsyncHooksService } from './../async-hooks/async-hooks.service';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Observable, throwError, TimeoutError } from "rxjs";
import { map, catchError, timeout } from "rxjs/operators";

interface Response<T> {
  code: number,
  data: T,
  message: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(
    private readonly asyncHooksService: AsyncHooksService
  ){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    console.log('this is response interceptor start')
    return next.handle().pipe(
      map(data=>{
        // const response = context.switchToHttp().getResponse()
        // response.status(200)
        const res = { code: 0, data, message: 'success'}
        // const requestId = this.asyncHooksService.requestId;
        // const ts = Date.now() - this.asyncHooksService.ctx.req.beginTime;
        // console.log(`[${requestId}] cost[${ts}] http response: ${JSON.stringify(res)} `)

        // node 官方AsyncLocalStorage实现
        const requestId = this.asyncHooksService.reqId;
        const ts = Date.now() - this.asyncHooksService.store.req.beginTime;
        console.log(`[${requestId}] http response: cost[${ts}] ${JSON.stringify(res)} `)
        return res;
      }),
      timeout(20000),
      catchError(err => {
        console.log('this is timeout interceptor catch error ')
        if(err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException({ code: 1005, message: 'request timeout'}))
        }
        return throwError(err)
      })
    )
  }
}