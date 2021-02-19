import * as cls from 'cls-hooked';
import {Injectable} from '@nestjs/common';

export const NEST_NAMESPACE = 'NEST_NAMESPACE';
export const NEST_CTX = 'NEST_CTX';

@Injectable()
export class AsyncHooksService {
    get ns(): cls.Namespace {
        return cls.getNamespace(NEST_NAMESPACE) || cls.createNamespace(NEST_NAMESPACE);
    }

    get ctx() {
        return this.ns.get(NEST_CTX);
    }

    get requestId() {
        return this.ctx.requestId;
    }

}
