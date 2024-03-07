import { Injectable, Scope } from '@nestjs/common';

/**
 * 在注入提供者时有多种方法
 * DEFAULT: 默认的单例注入，每次请求都是使用同一个实例
 * REQUEST: 每次请求创建一个新的提供者实例，并且该实例在这次请求内被所有调用者所共享，请求完毕自动销毁
 * TRANSIENT：每次被使用者注入该提供者时都会创建一个新的实例，但之后的请求所有注入者都只延用各自已创建的实例了
 */
@Injectable({ scope: Scope.REQUEST })
export class SeventhService {
    protected demo = 0;

    async add() {
        this.demo++;
    }

    async find() {
        return this.demo;
    }
}
