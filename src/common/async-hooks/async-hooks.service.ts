import * as cls from 'cls-hooked';
import {Injectable} from '@nestjs/common';

export const NEST_NAMESPACE = 'NEST_NAMESPACE';
export const REQUESTID = 'REQUESTID';
export const NEST_CTX = 'NEST_CTX';

@Injectable()
export class AsyncHooksService {
    get ns(): cls.Namespace {
        return cls.getNamespace(NEST_NAMESPACE) || cls.createNamespace(NEST_NAMESPACE);
    }

    get requestId() {
        return this.ns.get(REQUESTID);
    }

    get ctx() {
        return this.ns.get(NEST_CTX);
    }
}
