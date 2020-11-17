import { Module } from '@nestjs/common';
import { OrderAppController } from './order-app.controller';
import { OrderAppService } from './order-app.service';

@Module({
  imports: [],
  controllers: [OrderAppController],
  providers: [OrderAppService],
})
export class OrderAppModule {}
