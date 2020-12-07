import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { PaymentAppService } from './payment-app.service';

@Controller()
export class PaymentAppController {
  private readonly logger = new Logger(PaymentAppController.name);
  constructor(private readonly paymentAppService: PaymentAppService) {}

  @MessagePattern('verify_payment_order')
  async verifyPaymentOrder(@Payload() data: any): Promise<any> {
    this.logger.log('Handling message verify payment of order: ' + data.order_id + ' from Payment RMQ Queue.');
    const result = this.paymentAppService.mockVerifyPaymentResult(data);
    this.logger.log('payment verify result of order: ' + data.order_id + ' ' + result)
    return { result, order_id: data.order_id }
  }
}
