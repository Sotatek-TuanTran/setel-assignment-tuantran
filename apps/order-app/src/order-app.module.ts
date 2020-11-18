import { Order } from './models/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { OrderAppController } from './order-app.controller';
import { OrderAppService } from './order-app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'order_db',
      entities: [Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://0.0.0.0:5672'],
          queue: 'payment_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [OrderAppController],
  providers: [OrderAppService],
})
export class OrderAppModule {}
