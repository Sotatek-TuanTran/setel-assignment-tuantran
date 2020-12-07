import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Order } from './models/order.entity';
import { OrderAppController } from './order-app.controller';
import { OrderAppService } from './order-app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/database.config';

describe('OrderAppController', () => {
  let orderAppController: OrderAppController;
  let orderAppService: OrderAppService;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [ dbConfig ]
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
    }).compile();

    orderAppService = app.get<OrderAppService>(OrderAppService);
    orderAppController = app.get<OrderAppController>(OrderAppController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(orderAppController.getHello()).toBe('Hello World!');
  //   });
  // });
  describe('get paginated list orders', () => {
    it('getLists', async () => {
      const mockListOrdersResult = {
        page: 1,
        perPage: 10,
        total: 2,
        data: [
          {
            order_id: 1,
            customer_name: 'Customer 1',
            address: 'Hanoi',
            phone: '0354554456',
            delivery_date: '2020-12-21T00:00:00.000Z',
            amount_money: 10,
            status: 'cancelled',
            created_at: '2020-12-07T12:03:04.000Z',
            updated_at: '2020-12-07T12:03:04.000Z'
          },
          {
            order_id: 2,
            customer_name: 'Customer 2',
            address: 'Hai Duong',
            phone: '038655665',
            delivery_date: '2020-12-22T00:00:00.000Z',
            amount_money: 10,
            status: 'confirmed',
            created_at: '2020-12-07T12:05:06.000Z',
            updated_at: '2020-12-07T12:05:06.000Z'
          }
        ]
      }
      
      jest.spyOn(orderAppService, 'getLists').mockImplementation(async (options) => mockListOrdersResult);
      
      expect(await orderAppController.getLists({ page: 1, perPage: 10 })).toBe(mockListOrdersResult);
    })
  });

  describe('Create new Order', () => {
    it('createOrder', async () => {
      const mockCreateOrderRes = {
        order_id: 3,
        customer_name: 'Customer 3',
        address: 'Hai Phong',
        phone: '036786876',
        delivery_date: new Date(2020, 12, 22),
        amount_money: 12,
        status: 'confirmed',
        created_at: new Date(2020, 12, 7, 12, 6, 6),
        updated_at:  new Date(2020, 12, 7, 12, 6, 7),
      };
      const orderInput = {
        customer_name: 'Customer 3',
        address: 'Hai Phong',
        phone: '036786876',
        delivery_date: new Date(2020, 12, 22),
        amount_money: 12,
      }
      jest.spyOn(orderAppService, 'createOrder').mockImplementation(async (orderInp) => mockCreateOrderRes);
      expect(await orderAppController.createOrder(orderInput)).toBe(mockCreateOrderRes);
    })
  })

  describe('Cancel Order', () => {
    it('cancelOrder', async () => {
      const mockCancelRes = {
        order_id: 3,
        customer_name: 'Customer 3',
        address: 'Hai Phong',
        phone: '036786876',
        delivery_date: new Date(2020, 12, 22),
        amount_money: 12,
        status: 'cancelled',
        created_at: new Date(2020, 12, 7, 12, 6, 6),
        updated_at:  new Date(2020, 12, 7, 12, 6, 7),
      }
      jest.spyOn(orderAppService, 'updateStatus').mockImplementation(async (orderId, status) => mockCancelRes);
      expect(await orderAppController.cancelOrder({order_id: 3})).toBe(mockCancelRes);
    })
  })
});
