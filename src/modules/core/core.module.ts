import { Global, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';

// 设置CoreModule为全局模块
@Global()
@Module({
    providers: [ConfigService],
    exports: [ConfigService],
})
export class CoreModule {}
