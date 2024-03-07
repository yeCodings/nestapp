import { Injectable } from '@nestjs/common';

import { ThirdService } from './third.service';

@Injectable()
export class FourthService {
    constructor(private third: ThirdService) {}

    getContent() {
        return this.third.useFactory();
    }

    async Promise() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.third);
            }, 100);
        });
    }
}
