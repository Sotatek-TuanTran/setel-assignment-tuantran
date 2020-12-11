import { Observable } from 'rxjs';
import { IOrderGrpcClient, IPagination } from './interfaces/ordergrpc.interface';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateOrderDto } from 'apps/order-app/src/dto/createOrder.dto';

@Injectable()
export class OrderService implements OnModuleInit {
  private readonly logger = new Logger(OrderService.name);

  private orderGrpcClient: IOrderGrpcClient;
  constructor(@Inject('ORDER_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.orderGrpcClient = this.client.getService<IOrderGrpcClient>('OrderService');
  }

  getListOrders(options: IPagination): Observable<any> {
    this.logger.log('call order-app to get paginated list orders.')
    return this.orderGrpcClient.getLists(options);
  }

  createOrder(data: CreateOrderDto): Observable<any> {
    this.logger.log('Call to order-app to create new order.')
    return this.orderGrpcClient.createOrder(data);
  }

  checkStatus(orderId: number): Observable<any> {
    this.logger.log('Call to Order-app to check status of an order.')
    return this.orderGrpcClient.checkStatus({ order_id: orderId })
  }

  cancel(orderId: number): Observable<any> {
    this.logger.log('Call to Order-app to cancel an order.')
    return this.orderGrpcClient.cancelOrder({ order_id: orderId })
  }

}
