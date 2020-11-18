import { OrderByIdDto } from './dto/orderById.dto';
import { Order } from './models/order.entity';
import { Controller, Param } from '@nestjs/common';
import { Metadata, ServerUnaryCall  } from 'grpc';
import { OrderAppService } from './order-app.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GrpcMethod } from '@nestjs/microservices'
@Controller()
export class OrderAppController {
  constructor(private readonly orderAppService: OrderAppService) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  async createOrder(data: CreateOrderDto, metadata: Metadata, call: ServerUnaryCall<any>): Promise<Order> {
    return await this.orderAppService.createOrder(data);
  }

  @GrpcMethod('OrderService', 'cancelOrder')
  async cancelOrder(data: OrderByIdDto, metadata: Metadata, call: ServerUnaryCall<any>): Promise<Order> {
    return await this.orderAppService.updateStatus(data.order_id, 'cancelled');
  }

  @GrpcMethod('OrderService', 'CheckStatus')
  async checkStatus(data: OrderByIdDto, metadata: Metadata, call: ServerUnaryCall<any>): Promise<any> {
    const order = await this.orderAppService.getDetail(data.order_id);

    return { status: order.status }
  }
}
