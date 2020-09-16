import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('this is timeout interceptor start ')
    return next.handle().pipe(
      timeout(5000),
      catchError(err => {
        console.log('this is timeout interceptor catch error ')
        if(err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException({ code: 1005, message: 'request timeout'}))
        }
        console.log(err)
        return throwError(err)
      })
    )
  } 
}