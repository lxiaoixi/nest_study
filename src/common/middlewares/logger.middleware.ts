import { AsyncHooksService, NEST_CTX } from './../async-hooks/async-hooks.service';
import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request } from "express";
import { randomBytes } from 'crypto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly asyncHooksService: AsyncHooksService 
  ) {}
  use(req: any, res: Response, next: () => void) {
    req.beginTime = Date.now();

    // const { ns } = this.asyncHooksService;
    // ns.run(function () {

    //     ns.bindEmitter(req);
    //     ns.bindEmitter(res);
    
    //     const requestId = req.get('X-Request-ID') || randomBytes(16).toString('hex');
    //     ns.set(NEST_CTX, { req, requestId }) // 设置请求的上下文对象

    //     console.log(`[${requestId}] http request: this is log middleware start`, req.query.name)
    //     next()
    // });

    // node 官方AsyncLocalStorage实现
    const { localStorage } = this.asyncHooksService;
    const requestId = req.get('X-Request-ID') || randomBytes(16).toString('hex')
    const context = { req, requestId }
    localStorage.run(context, () => {  // 保存context至localStorage， 后面可通过.getStore()方法获取context
      console.log(`[${requestId}] http request: this is log middleware start`)
      next()
    });
    
  }
}