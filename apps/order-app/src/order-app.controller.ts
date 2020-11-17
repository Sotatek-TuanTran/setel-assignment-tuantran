import { Controller, Get } from '@nestjs/common';
import { OrderAppService } from './order-app.service';

@Controller()
export class OrderAppController {
  constructor(private readonly orderAppService: OrderAppService) {}

  @Get()
  getHello(): string {
    return this.orderAppService.getHello();
  }
}
