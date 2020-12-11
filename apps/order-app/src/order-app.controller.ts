import { IPagination } from './interfaces/pagination.interface';
import { OrderByIdDto } from './dto/orderById.dto';
import { Order, OrderStatus } from './models/order.entity';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Metadata, ServerUnaryCall  } from 'grpc';
import { OrderAppService } from './order-app.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { TransformPaginationInterceptor } from './interceptors/transform-pagination.interceptor'
import { 
  ORDER_SERVICE,
  CREATE_ORDER,
  GET_LIST_ORDERS,
  CANCEL_ORDER,
  CHECK_ORDER_STATUS
} from './constants/order-service.constant';
@Controller()
export class OrderAppController {
  constructor(private readonly orderAppService: OrderAppService) {}

  @UseInterceptors(new TransformPaginationInterceptor())
  @GrpcMethod(ORDER_SERVICE, GET_LIST_ORDERS)
  async getLists(options: IPagination, metadata?: Metadata, call?: ServerUnaryCall<any>): Promise<any> {
    return await this.orderAppService.getLists(options);
  }

  @GrpcMethod(ORDER_SERVICE, CREATE_ORDER)
  async createOrder(data: CreateOrderDto, metadata?: Metadata, call?: ServerUnaryCall<any>): Promise<Order> {
    return await this.orderAppService.createOrder(data);
  }

  @GrpcMethod(ORDER_SERVICE, CANCEL_ORDER)
  async cancelOrder(data: OrderByIdDto, metadata?: Metadata, call?: ServerUnaryCall<any>): Promise<Order> {
    const order = await this.orderAppService.getDetail(data.order_id);
    if (order && order.status !== OrderStatus.CANCELLED && order.status !== OrderStatus.DELIVERED) {
      return await this.orderAppService.updateStatus(data.order_id, OrderStatus.CANCELLED);
    }
    return order;
  }

  @GrpcMethod(ORDER_SERVICE, CHECK_ORDER_STATUS)
  async checkStatus(data: OrderByIdDto, metadata?: Metadata, call?: ServerUnaryCall<any>): Promise<any> {
    const order = await this.orderAppService.getDetail(data.order_id);

    return { status: order.status }
  }
}
