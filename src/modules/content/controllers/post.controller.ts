import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    ValidationPipe,
} from '@nestjs/common';

import { isNil } from 'lodash';

import { CreatePostDto } from '../dots/crete-post.dto';
import { UpdatePostDto } from '../dots/update-post.dto';
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
    // 获取所有帖子数据(@Get用于获取数据)
    @Get()
    async index() {
        return posts;
    }

    // 获取ID为id的帖数据
    @Get(':id')
    async show(@Param('id') id: number) {
        const post = posts.find((item) => item.id === Number(id));
        if (isNil(post)) throw new NotFoundException(`the post with id ${id} not exits!`);
        return post;
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
        // 新帖子的id在原来最大的id帖子上加一，添加到posts
        const newPost: PostEntity = {
            id: Math.max(...posts.map(({ id }) => id + 1)),
            ...data,
        };
        posts.push(newPost);
        return newPost;
    }

    // 更新当前id的帖子数据(@Patch用于更新部分数据)
    @Patch()
    // 接收一个PostEntity类型的请求体数据
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
        { id, ...data }: UpdatePostDto,
    ) {
        // 在posts数组中查找与请求数据id匹配的项
        let toUpdate = posts.find((item) => item.id === Number(id));
        // 如果找不到匹配项，抛出NotFoundException异常
        if (isNil(toUpdate)) throw new NotFoundException(`the post with id ${id} not exits!`);
        // 将找到的项与请求数据合并
        toUpdate = { ...toUpdate, ...data };
        // 更新posts数组中的对应项
        posts = posts.map((item) => (item.id === Number(id) ? toUpdate : item));
        // 返回更新后的项
        return toUpdate;
    }

    // 删除帖子数据
    @Delete(':id') // 使用HTTP DELETE方法，参数为id
    // 接收一个名为id的参数，类型为number
    async delete(@Param('id') id: number) {
        // 在posts数组中查找与请求数据id匹配的项
        const toDelete = posts.find((item) => item.id === Number(id));
        // 如果找不到匹配项，抛出NotFoundException异常
        if (isNil(toDelete)) throw new NotFoundException(`the post with id ${id} not exits!`);
        // 从posts数组中删除对应的项
        posts = posts.filter((item) => item.id !== Number(id));
        // 返回被删除的项
        return toDelete;
    }
}
