import { Order } from './models/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { OrderAppController } from './order-app.controller';
import { OrderAppService } from './order-app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { DeliverOrderProcessor } from './deliver-order.process';

import dbConfig from './config/database.config';
import clientServicesCfg from './config/clients.config';
import {PAYMENT_RMQ_SERVICE} from './constants/payment-service.constant';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ dbConfig, clientServicesCfg ]
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: configService.get<any>('client_services.redis_server'),
        prefix: 'deliver_order',
      })
    }),
    BullModule.registerQueue({
      name: 'deliver_orders'
    }),
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
        name: PAYMENT_RMQ_SERVICE,
        useFactory: (configService: ConfigService) => ({
          ...configService.get<any>('client_services.payment_queue')
        })
      }
    ])
  ],
  controllers: [OrderAppController],
  providers: [OrderAppService, DeliverOrderProcessor],
})
export class OrderAppModule {}
