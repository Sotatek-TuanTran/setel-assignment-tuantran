import { Order } from './models/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { OrderAppController } from './order-app.controller';
import { OrderAppService } from './order-app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import dbConfig from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ dbConfig ]
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<any>('database'),
        entities: [Order],
      })
    }),
    TypeOrmModule.forFeature([Order]),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'PAYMENT_SERVICE',
        useFactory: (configService: ConfigService) => ({
          name: configService.get<string>('PAYMENT_RMQ_NAME') || 'PAYMENT_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: [ configService.get<string>('PAYMENT_RMQ_URL') || 'amqp://rabbitmq-server:5672'],
            queue: configService.get<string>('PAYMENT_RMQ_QUEUE') || 'payment_queue',
            queueOptions: {
              durable: configService.get<boolean>('PAYMENT_RMQ_OPT_DURABLE') || false
            }
          }
        })
      }
    ])
  ],
  controllers: [OrderAppController],
  providers: [OrderAppService],
})
export class OrderAppModule {}
