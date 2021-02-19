import {Module, Global} from '@nestjs/common';
import {AsyncHooksService} from './async-hooks.service';

@Global()
@Module({
    providers: [AsyncHooksService],
    exports: [AsyncHooksService],
})
export class AsyncHooksModule {}
