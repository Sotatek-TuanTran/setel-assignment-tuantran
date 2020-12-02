import { Observable } from 'rxjs';
import { OrderGrpcClient } from './interfaces/ordergrpc.interface';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateOrderDto } from 'apps/order-app/src/dto/createOrder.dto';

@Injectable()
export class OrderService implements OnModuleInit {
  private orderGrpcClient: OrderGrpcClient;
  constructor(@Inject('ORDER_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.orderGrpcClient = this.client.getService<OrderGrpcClient>('OrderService');
  }

  getListOrders(options: any): Observable<any> {
    return this.orderGrpcClient.getLists(options);
  }

  createOrder(data: CreateOrderDto): Observable<any> {
    return this.orderGrpcClient.createOrder(data);
  }

  checkStatus(orderId: number): Observable<any> {
    return this.orderGrpcClient.checkStatus({ order_id: orderId })
  }

  cancel(orderId: number): Observable<any> {
    return this.orderGrpcClient.cancelOrder({ order_id: orderId })
  }

}
