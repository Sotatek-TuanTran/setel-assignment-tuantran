import { ClientRMQ } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './models/order.entity';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class OrderAppService {
  private readonly logger = new Logger(OrderAppService.name);

  constructor (
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject('PAYMENT_SERVICE') private paymentRMQClient: ClientRMQ
  ) {}

  async getLists(options: any): Promise<any> {
    const { page = 1, perPage = 10 } = options;
    const offset = page >= 1 ? ((page - 1) * perPage) : 0;
    
    const result = await this.orderRepository.findAndCount({
      skip: offset,
      take: perPage,
    })
    if (!result) {
      return {
        page,
        perPage,
        total: 0,
        data: []
      }
    }
    const [data , total ] = result
    return {
      page,
      perPage,
      total,
      data: data || []
    }
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    this.logger.log('save order to DB');
    let order = await this.orderRepository.save(data);
    if (order) {
      this.logger.log('verifying payment of order: ' + order.order_id );
      order = await this.verifyPayment(order);
    }
    return order;
  }

  async getDetail(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOneOrFail(orderId);

    return order;
  }

  async updateStatus(orderId: number, status: string): Promise<Order> {
    this.logger.log('update status of order to ' + status);
    await this.orderRepository.update(orderId, { status });

    return this.orderRepository.findOneOrFail(orderId);
  }

  // Call to Payment App to verify payment of the order
  async verifyPayment(order: Order): Promise<Order> {
    this.logger.log('Send a message to payment RMQ queue to verify payment of order order.order_id')
    return new Promise((resolve, reject) => {
      this.paymentRMQClient.send('verify_payment_order', order)
        .subscribe(async (res) => {
          if (res.result === 'verified' && order.order_id === res.order_id) {
            this.logger.log('payment of order ' + order.order_id + ' was verified.')
            order = await this.updateStatus(order.order_id, 'confirmed')
          } else {
            this.logger.log('payment of order ' + order.order_id + ' was declined')
            order = await this.updateStatus(order.order_id, 'cancelled')
          }
          resolve(order)
        })
    })
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async triggerDeliveredOrders() {
    this.logger.log('mock change status of order from confirmed to delivered after 10 sec.');
    await this.orderRepository.update({ status: 'confirmed' }, { status: 'delivered' })
  }

}
