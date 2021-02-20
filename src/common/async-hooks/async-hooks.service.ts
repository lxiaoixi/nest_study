import * as cls from 'cls-hooked';
import {Injectable} from '@nestjs/common';

export const NEST_NAMESPACE = 'NEST_NAMESPACE';
export const NEST_CTX = 'NEST_CTX';
import { AsyncLocalStorage } from 'async_hooks'

@Injectable()
export class AsyncHooksService {
    _localStorage: any;

    get ns(): cls.Namespace {
        return cls.getNamespace(NEST_NAMESPACE) || cls.createNamespace(NEST_NAMESPACE);
    }

    get ctx() {
        return this.ns.get(NEST_CTX);
    }

    get requestId() {
        return this.ctx.requestId;
    }

    get req() {
        return this.ctx.req;
    }

    // node 官方AsyncLocalStorage实现
    get localStorage() {
        
        if(this._localStorage){
            return this._localStorage
        }
        this._localStorage = new AsyncLocalStorage()
        return this._localStorage
    }

    get store() {
        return this._localStorage.getStore();
    }

    get reqId() {
        return this.store.requestId;
    }
}
