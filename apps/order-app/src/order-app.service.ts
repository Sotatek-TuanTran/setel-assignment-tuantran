import { ClientRMQ } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order, OrderStatus } from './models/order.entity';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  VERIFY_PAYMENT_OF_ORDER,
  PAYMENT_RMQ_SERVICE,
} from './constants/payment-service.constant';
import { calcSkipOffset } from './helpers/index.helper';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class OrderAppService {
  private readonly logger = new Logger(OrderAppService.name);

  constructor (
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(PAYMENT_RMQ_SERVICE) private paymentRMQClient: ClientRMQ,
    @InjectQueue('deliver_orders') private deliverOrderQueue: Queue
  ) {}

  async getLists(options: any): Promise<any> {
    const { page = 1, perPage = 10 } = options;
    const offset = calcSkipOffset(page, perPage);
    
    const result = await this.orderRepository.findAndCount({
      skip: offset,
      take: perPage,
    })
    const [data = [] , total = 0] = Array.isArray(result) ? result : []
    return {
      page,
      perPage,
      total,
      data
    }
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    this.logger.log('save order to DB');
    let order = await this.orderRepository.save(data);
    if (order) {
      this.logger.log('verifying payment of order: ' + order.order_id );
      order = await this.verifyPayment(order);
      const job = await this.deliverOrderQueue.add('delivered_order', order, {
        delay: 10000, // delay execute job after 10 seconds
        attempts: 2,
        removeOnComplete: true
      });
    }
    return order;
  }

  async getDetail(orderId: number): Promise<Order | null> {
    return this.orderRepository.findOneOrFail(orderId);
  }

  async updateStatus(orderId: number, status: OrderStatus): Promise<Order | null> {
    this.logger.log('update status of order to ' + status);
    await this.orderRepository.update(orderId, { status });

    return this.getDetail(orderId);
  }

  async deliveredOrder(orderId: number): Promise<Order | null> {
    await this.orderRepository.update({ order_id: orderId, status: OrderStatus.CONFIRMED }, { status: OrderStatus.DELIVERED });

    return this.getDetail(orderId);
  }

  // Call to Payment App to verify payment of the order
  async verifyPayment(order: Order): Promise<Order> {
    this.logger.log('Send a message to payment RMQ queue to verify payment of order order.order_id')
    return new Promise((resolve, reject) => {
      this.paymentRMQClient.send(VERIFY_PAYMENT_OF_ORDER, order)
        .subscribe(async (res) => {
          if (res.result === 'verified' && order.order_id === res.order_id) {
            this.logger.log('payment of order ' + order.order_id + ' was verified.')
            order = await this.updateStatus(order.order_id, OrderStatus.CONFIRMED)
          } else {
            this.logger.log('payment of order ' + order.order_id + ' was declined')
            order = await this.updateStatus(order.order_id, OrderStatus.CANCELLED)
          }
          resolve(order)
        })
    })
  }
}
