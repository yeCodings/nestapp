import { Injectable } from '@nestjs/common';

import { PartialType } from '@nestjs/swagger';

import { IsDefined, IsNumber } from 'class-validator';

import { CreatePostDto } from './crete-post.dto';

@Injectable()
export class UpdatePostDto extends PartialType(CreatePostDto) {
    // 检查是否为数字
    @IsNumber(undefined, { groups: ['update'], message: '帖子ID格式错误' })
    // 检查是否未定义
    @IsDefined({ groups: ['update'], message: '帖子ID必须指定' })
    id: number;
}
