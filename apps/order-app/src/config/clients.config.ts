import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { PAYMENT_RMQ_SERVICE } from '../constants/payment-service.constant';

export default registerAs('client_services', () => ({
  payment_queue: {
    name: PAYMENT_RMQ_SERVICE,
    transport: Transport.RMQ,
    options: {
      urls: [process.env.PAYMENT_RMQ_URL || 'amqp://rabbitmq-server:5672'],
      queue: process.env.PAYMENT_RMQ_QUEUE || 'payment_queue',
      queueOptions: {
        durable: Boolean(process.env.PAYMENT_RMQ_OPT_DURABLE) || false
      }
    }
  },
  redis_server: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    db: process.env.REDIS_DB || 0,
    password: process.env.REDIS_PASSWORD || '',
  }
}));