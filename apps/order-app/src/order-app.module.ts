import { Order } from './models/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { OrderAppController } from './order-app.controller';
import { OrderAppService } from './order-app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'order_db',
      entities: [Order],
      synchronize: true,
    })
  ],
  controllers: [OrderAppController],
  providers: [OrderAppService],
})
export class OrderAppModule {}
