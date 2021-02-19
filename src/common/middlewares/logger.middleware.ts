import { AsyncHooksService, REQUESTID, NEST_CTX } from './../async-hooks/async-hooks.service';
import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request } from "express";
import { randomBytes } from 'crypto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly asyncHooksService: AsyncHooksService 
  ) {}
  use(req: Request, res: Response, next: () => void) {
    const { ns } = this.asyncHooksService;
    ns.run(function () {

        ns.bindEmitter(req);
        ns.bindEmitter(res);
        const requestId = req.get('X-Request-ID') || randomBytes(16).toString('hex');
        ns.set(REQUESTID, requestId);  // 设置请求链路的唯一标识
        ns.set(NEST_CTX, { req }) // 设置请求的上下文
        console.log(`[${requestId}] http request: this is log middleware start`)
        next()
    });
    
  }
}