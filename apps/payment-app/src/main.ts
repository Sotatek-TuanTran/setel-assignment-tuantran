import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { PaymentAppModule } from './payment-app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentAppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.PAYMENT_RMQ_URL || 'amqp://rabbitmq-server:5672'],
        queue: process.env.PAYMENT_RMQ_QUEUE || 'payment_queue',
        queueOptions: {
          durable: Boolean(process.env.PAYMENT_RMQ_OPT_DURABLE) || false
        }
      }
    }
  );
  app.listen(() => console.log('Payment Service is listening'));
}
bootstrap();
