import { Observable } from 'rxjs';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Body, Controller, Get, Post, Param, Patch, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller('/api/orders')
export class OrderController {
  constructor (
    private orderService: OrderService
  ) {}
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'perPage'})
  @Get()
  index(@Query() options: any): Observable<any> {
    return this.orderService.getListOrders(options);
  }

  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({
    description: 'Created order'
  })
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
