import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentAppService {
  mockVerifyPaymentResult(order: any): string {
    const rand = Math.floor(Math.random() * 10);

    return (rand % 2 === 0) ? 'verified' : 'decline';
  }
}
