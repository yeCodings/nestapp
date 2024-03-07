import { Module } from '@nestjs/common';

import { TestController } from './controllers/test.controller';
import { EighthService } from './services/eighth.service';
import { FifthService } from './services/fifth.service';
import { FirstService } from './services/first.service';
import { FourthService } from './services/fourth.service';
import { SecondService } from './services/second.service';
import { SeventhService } from './services/seventh.service';
import { SixthService } from './services/sixth.service';
import { ThirdService } from './services/third.service';

const firstObject = {
    useValue: () => 'useValue提供者',
    useAlias: () => '别名提供者',
};

const firstInstance = new FirstService();

/**
 * 共享模块
 * 模块是一个功能的集合，比如user,forum等，包含了各自控制器，服务等等
 * ExampleModule如果要调用ContentModule模块的某个提供者，必须先在ContentModule中使用exports导出该提供者，然后在ExampleModule模块中使用imports导入
 * 然后就可以在ExampleModule的控制器,提供者等类中注入该PostService了
 */
@Module({
    providers: [
        {
            provide: FirstService,
            useValue: firstObject,
        },
        {
            provide: 'ID-EXAMPLE',
            useValue: firstInstance,
        },
        {
            provide: SecondService,
            useClass: ThirdService,
        },
        {
            provide: 'FACTORY-EXAMPLE',
            useFactory(second: SecondService) {
                const factory = new FourthService(second);
                return factory;
            },
            inject: [SecondService],
        },
        {
            provide: 'ALIAS-EXAMPLE',
            useExisting: FifthService,
        },
        {
            provide: 'ASYNC-EXAMPLE',
            useFactory: async () => {
                const factory = new FourthService(new SecondService());
                return factory;
            },
        },
        FifthService,
        SixthService,
        SeventhService,
        EighthService,
    ],
    controllers: [TestController],
})
export class ExampleModule {}
