import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class PaymentAppService {
  private readonly logger = new Logger(PaymentAppService.name);

  mockVerifyPaymentResult(order: any): string {
    this.logger.log('Mocking verify payment result');
    const rand = Math.floor(Math.random() * 10);

    return (rand % 2 === 0) ? 'verified' : 'decline';
  }
}
