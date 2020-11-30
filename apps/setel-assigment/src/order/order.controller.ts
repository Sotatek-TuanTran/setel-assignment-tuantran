import { Observable } from 'rxjs';
import { CreateOrderDto } from './../../../order-app/src/dto/createOrder.dto';
import { Body, Controller, Get, Post, Param, Patch, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('/api/orders')
export class OrderController {
  constructor (
    private orderService: OrderService
  ) {}

  @Get()
  index(@Query() options: any): Observable<any> {
    return this.orderService.getListOrders(options);
  }
  
  @Post()
  store(@Body() orderDt: CreateOrderDto): Observable<any> {
    return this.orderService.createOrder(orderDt)
  }

  @Get('/:id')
  checkStatus(@Param('id') orderId: number): Observable<any> {
    return this.orderService.checkStatus(orderId);
  }

  @Patch('/:id/cancel')
  cancelOrder(@Param('id') orderId: number): Observable<any> {
    return this.orderService.cancel(orderId)
  }
}
