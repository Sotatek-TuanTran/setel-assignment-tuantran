import { ClientRMQ } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './models/order.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderAppService {
  constructor (
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject('PAYMENT_SERVICE') private paymentRMQClient: ClientRMQ
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    let order = await this.orderRepository.save(data);
    if (order) {
      order = await this.verifyPayment(order)
    }
    return order;
  }

  async getDetail(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOneOrFail(orderId);

    return order;
  }

  async updateStatus(orderId: number, status: string): Promise<Order> {
    await this.orderRepository.update(orderId, { status });

    return this.orderRepository.findOneOrFail(orderId);
  }

  async verifyPayment(order: Order): Promise<Order> {
    return new Promise((resolve, reject) => {
      this.paymentRMQClient.send('verify_payment_order', order)
        .subscribe(async (res) => {
          if (res.result === 'verified' && order.order_id === res.order_id) {
            order = await this.updateStatus(order.order_id, 'confirmed')
          }
          resolve(order)
        })
    })
  }
}
