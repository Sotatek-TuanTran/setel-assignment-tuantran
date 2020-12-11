import { Order } from './models/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { OrderAppController } from './order-app.controller';
import { OrderAppService } from './order-app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import dbConfig from './config/database.config';
import clientServicesCfg from './config/clients.config';
import {PAYMENT_RMQ_SERVICE} from './constants/payment-service.constant';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ dbConfig, clientServicesCfg ]
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
        name: PAYMENT_RMQ_SERVICE,
        useFactory: (configService: ConfigService) => ({
          ...configService.get<any>('client_services.payment_queue')
        })
      }
    ])
  ],
  controllers: [OrderAppController],
  providers: [OrderAppService],
})
export class OrderAppModule {}
