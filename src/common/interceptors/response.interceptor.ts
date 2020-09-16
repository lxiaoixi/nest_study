import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Observable, throwError, TimeoutError } from "rxjs";
import { map, catchError, timeout } from "rxjs/operators";

interface Response<T> {
  code: number,
  data: T,
  message: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    console.log('this is response interceptor start')
    return next.handle().pipe(
      map(data=>{
        const res = { code: 0, data, message: 'success'}
        console.log('http response...', res)
        return res;
      }),
      timeout(5000),
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