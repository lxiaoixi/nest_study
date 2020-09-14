import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private reflect: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    console.log('this is auth gaurd start');
    const allowVisit = this.reflect.get<boolean>('ignoreAuthGuard', context.getHandler())
    if (allowVisit) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request); 
  }

  private async validateRequest(req) { // 鉴权逻辑
    const token = req.get('token');
    if (token) {
      return true
    } else {
      throw new  UnauthorizedException({ code: 2001, message: 'token无效' })
    }
  }
}