import { Order } from './models/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderAppService {
  constructor (
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  
}
