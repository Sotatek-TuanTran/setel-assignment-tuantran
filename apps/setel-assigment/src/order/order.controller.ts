import { IPagination } from './interfaces/ordergrpc.interface';
import { Observable } from 'rxjs';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Body, Controller, Get, Post, Param, Patch, Query, Logger } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBody, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';

@Controller('/api/orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor (
    private orderService: OrderService
  ) {}
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'perPage'})
  @Get()
  index(@Query() options: IPagination): Observable<any> {
    this.logger.log('received request get list orders from React-app client')
    return this.orderService.getListOrders(options);
  }

  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({
    description: 'Created order'
  })
  @Post()
  store(@Body() orderDt: CreateOrderDto): Observable<any> {
    this.logger.log('Request create new order from React app.')
    return this.orderService.createOrder(orderDt)
  }

  @Get('/:id')
  checkStatus(@Param('id') orderId: number): Observable<any> {
    return this.orderService.checkStatus(orderId);
  }

  @Patch('/:id/cancel')
  cancelOrder(@Param('id') orderId: number): Observable<any> {
    this.logger.log('Request cancel order from React app.')
    return this.orderService.cancel(orderId)
  }
}
