import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    ValidationPipe,
} from '@nestjs/common';

import { isNil } from 'lodash';

import { CreatePostDto } from '../dots/crete-post.dto';
import { UpdatePostDto } from '../dots/update-post.dto';
import { PostService } from '../services/post-service';
import { PostEntity } from '../types';

let posts: PostEntity[] = [
    { title: '第一篇文章标题', body: '第一篇文章内容' },
    { title: '第二篇文章标题', body: '第二篇文章内容' },
    { title: '第三篇文章标题', body: '第三篇文章内容' },
    { title: '第四篇文章标题', body: '第四篇文章内容' },
    { title: '第五篇文章标题', body: '第五篇文章内容' },
    { title: '第六篇文章标题', body: '第六篇文章内容' },
].map((v, id) => ({ ...v, id }));

@Controller('posts')
export class PostController {
    // 在控制器中通过依赖注入的方式使用该服务了，比如通过constructor注入
    constructor(private postService: PostService) {}

    // 获取所有帖子数据(@Get用于获取数据)
    @Get()
    async index() {
        return this.postService.findAll();
    }

    // 获取ID为id的帖数据
    @Get(':id')
    async show(@Param('id', new ParseIntPipe()) id: number) {
        return this.postService.findOne(id);
    }

    // 新增帖子(@Post用于新增数据)
    @Post()
    async store(
        @Body(
            // 验证管道
            new ValidationPipe({
                transform: true, // 转换
                forbidNonWhitelisted: true, // 禁止非空白名单
                forbidUnknownValues: true, // 禁止未知值
                validationError: { target: false }, // 验证错误
                groups: ['create'],
            }),
        )
        data: CreatePostDto,
    ) {
        return this.postService.create(data);
    }

    // 更新当前id的帖子数据(@Patch用于更新部分数据)
    @Patch()
    async update(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['update'],
            }),
        )
        data: UpdatePostDto,
    ) {
        return this.postService.update(data);
    }

    // 删除帖子数据,使用HTTP DELETE方法，参数为id
    @Delete(':id')
    /**
     * 接收一个名为id的参数，类型为number,在posts数组中查找与请求数据id匹配的项
     * 如果找不到匹配项，抛出NotFoundException异常
     * 从posts数组中删除对应的项
     * 返回被删除的项
     */
    async delete(@Param('id') id: number) {
        const toDelete = posts.find((item) => item.id === Number(id));

        if (isNil(toDelete)) throw new NotFoundException(`the post with id ${id} not exits!`);

        posts = posts.filter((item) => item.id !== Number(id));

        return toDelete;
    }
}
