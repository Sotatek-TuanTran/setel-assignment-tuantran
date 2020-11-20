import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Get } from '@nestjs/common';
import { PaymentAppService } from './payment-app.service';

@Controller()
export class PaymentAppController {
  constructor(private readonly paymentAppService: PaymentAppService) {}

  @MessagePattern('verify_payment_order')
  async verifyPaymentOrder(@Payload() data: any): Promise<any> {
    const result = this.paymentAppService.mockVerifyPaymentResult(data);

    return { result, order_id: data.order_id }
  }
}
