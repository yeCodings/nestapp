import { Module } from '@nestjs/common';

import { PostController } from './controllers/post.controller';
import { PostService } from './services/post-service';

/**
 * 提供者需要在模块元元素的providers中注册才可以被本模块的其它类注入
 * 需要在exports中导出后才能被其它模块调用
 */
@Module({
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class ContentModule {}
