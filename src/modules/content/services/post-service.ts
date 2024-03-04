import { Injectable, NotFoundException } from '@nestjs/common';

import { isNil } from 'lodash';

import { CreatePostDto } from '../dots/crete-post.dto';
import { UpdatePostDto } from '../dots/update-post.dto';
import { PostEntity } from '../types';

@Injectable()
export class PostService {
    protected posts: PostEntity[] = [
        { title: '第一篇文章标题', body: '第一篇文章内容' },
        { title: '第二篇文章标题', body: '第二篇文章内容' },
        { title: '第三篇文章标题', body: '第三篇文章内容' },
        { title: '第四篇文章标题', body: '第四篇文章内容' },
        { title: '第五篇文章标题', body: '第五篇文章内容' },
        { title: '第六篇文章标题', body: '第六篇文章内容' },
    ].map((v, id) => ({ ...v, id }));

    async findAll() {
        return this.posts;
    }

    async findOne(id: number) {
        const post = this.posts.find((item) => item.id === id);
        if (isNil(id)) throw new NotFoundException(`the post with id ${id} not exits`);
        return post;
    }

    // 新帖子的id在原来最大的id帖子上加一，添加到posts
    async create(data: CreatePostDto) {
        const newPost: PostEntity = {
            id: Math.max(...this.posts.map(({ id }) => id + 1)),
            ...data,
        };
        this.posts.push(newPost);
        return newPost;
    }

    /**
     * 在posts数组中查找与请求数据id匹配的项,如果找不到匹配项，抛出NotFoundException异常
     * 将找到的项与请求数据合并,更新posts数组中的对应项
     * 返回更新后的项
     */
    async update(data: UpdatePostDto) {
        let toUpdate = this.posts.find((item) => item.id === data.id);
        if (isNil(toUpdate)) throw new NotFoundException(`the post with id ${data.id} not exits!`);
        toUpdate = { ...toUpdate, ...data };
        this.posts = this.posts.map((item) => (item.id === data.id ? toUpdate : item));
        return toUpdate;
    }

    async delete(id: number) {
        const toDelete = this.posts.find((item) => item.id === id);
        if (isNil(toDelete)) throw new NotFoundException(`the toDelete with ${id} not exits`);
        this.posts = this.posts.filter((item) => item.id === id);
        return toDelete;
    }
}
