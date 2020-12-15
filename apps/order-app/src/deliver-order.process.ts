import { OrderAppService } from './order-app.service';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OrderStatus } from './models/order.entity';

@Processor('deliver_orders')
export class DeliverOrderProcessor {
  private readonly logger = new Logger(DeliverOrderProcessor.name);
  constructor (
    private orderAppService: OrderAppService
  ) {}
  @Process('delivered_order')
  async handleDeliverOrder(job: Job): Promise<any> {
    const order = job.data
    if (order.status === OrderStatus.CONFIRMED) {
      this.logger.log('mock change status of order from confirmed to delivered after 10 sec.');
      await this.orderAppService.deliveredOrder(order.order_id);
    }
  }
}