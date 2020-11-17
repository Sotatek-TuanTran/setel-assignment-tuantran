import { NestFactory } from '@nestjs/core';
import { OrderAppModule } from './order-app.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderAppModule);
  await app.listen(3000);
}
bootstrap();
