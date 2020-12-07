import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { OrderAppModule } from './order-app.module';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderAppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.ORDER_APP_GRPC_URL || '0.0.0.0:50051',
        package: process.env.ORDER_APP_GRPC_PACKAGE || 'orders',
        loader: {
          keepCase: true
        },
        protoPath: join(__dirname, '../../apps/order-app/proto/order.proto')
      }
    }
  );
  app.listen(() => console.log('Order Service is listening'));
}
bootstrap();
