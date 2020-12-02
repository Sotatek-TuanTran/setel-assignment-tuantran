import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { OrderAppModule } from './order-app.module';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderAppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        loader: {
          keepCase: true
        },
        package: 'orders',
        protoPath: join(__dirname, '../../../apps/order-app/src/proto/order.proto')
      }
    },
  );
  app.listen(() => console.log('Order Service is listening'));
}
bootstrap();
