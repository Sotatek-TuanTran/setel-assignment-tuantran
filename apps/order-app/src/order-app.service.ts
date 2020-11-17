import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
