import { DynamicModule, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';

// 设置CoreModule为全局模块
@Module({})
export class CoreModule {
    static forRoot(options: { config: RecordAny }): DynamicModule {
        return {
            module: CoreModule,
            global: true, // 动态模块同样可以利用global属性设置为全局模块
            providers: [
                {
                    provide: ConfigService,
                    useFactory() {
                        return new ConfigService(options.config);
                    },
                },
            ],
            exports: [ConfigService],
        };
    }
}
