import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('http request..., this is log middleware start', req.body)
    next()
  }
}