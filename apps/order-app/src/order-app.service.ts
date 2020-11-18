import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './models/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderAppService {
  constructor (
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.save(data);

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
}
