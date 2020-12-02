import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { PaymentAppModule } from './payment-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentAppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq-server:5672'],
        queue: 'payment_queue',
        queueOptions: {
          durable: false
        }
      }
    }
  );
  app.listen(() => console.log('Payment Service is listening'));
}
bootstrap();
