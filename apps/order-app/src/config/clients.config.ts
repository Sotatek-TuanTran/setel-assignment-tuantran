import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('client-services', () => ({
  payment_queue: {
    name: process.env.PAYMENT_RMQ_NAME || 'PAYMENT_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [process.env.PAYMENT_RMQ_URL || 'amqp://rabbitmq-server:5672'],
      queue: process.env.PAYMENT_RMQ_QUEUE || 'payment_queue',
      queueOptions: {
        durable: Boolean(process.env.PAYMENT_RMQ_OPT_DURABLE) || false
      },
    }
  }
}));