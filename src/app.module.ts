import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './modules/content/content.module';
import { CoreModule } from './modules/core/core.module';
import { ExampleModule } from './modules/example/example.module';

@Module({
    imports: [
        ContentModule,
        ExampleModule,
        // 如果要在模块导入时传入参数，则需要定义动态模块
        CoreModule.forRoot({
            config: {
                name: 'nestjs 学习',
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
