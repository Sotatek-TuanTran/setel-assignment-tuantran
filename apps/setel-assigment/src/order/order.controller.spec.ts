import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { of } from 'rxjs';
import { join } from 'path';
import { CreateOrderDto } from './dto/createOrder.dto'

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'ORDER_SERVICE',
            transport: Transport.GRPC,
            options: {
              package: 'orders',
              url: 'order-app:50051',
              loader: {
                keepCase: true
              },
              protoPath: join(__dirname, '../../src/order/proto/order.proto')
            }
          }
        ])
      ],
      controllers: [OrderController],
      providers: [OrderService]
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
  describe('Get list orders', () => {
    it('index', () => {
      let mockListOrders = {
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
      jest.spyOn(orderService, 'getListOrders').mockImplementation((options) => of(mockListOrders));
      controller.index({ page: 1, perPage: 10}).subscribe((data) => {
        expect(data).toEqual(mockListOrders);
      })
    })

    describe('create an order', () => {
      it('store', () => {
        let orderInp = {
          customer_name: 'Customer 2',
          address: 'Hai Duong',
          phone: '03u545676',
          delivery_date: new Date(2020, 12, 22),
          amount_money: 10,
        }
        let mockOrderRes = {
          order_id: 2,
          customer_name: 'Customer 2',
          address: 'Hai Duong',
          phone: '03u545676',
          delivery_date: '2020-12-22T00:00:00.000Z',
          amount_money: 10,
          status: 'confirmed',
          created_at: '2020-12-07T00:00:00.000Z',
          updated_at: '2020-12-07T00:00:00.000Z'
        }
        jest.spyOn(orderService, 'createOrder').mockImplementation((input: CreateOrderDto) => of(mockOrderRes))
        controller.store(orderInp).subscribe((result) => {
          expect(result).toEqual(mockOrderRes)
        })
      })
    });

    describe('Cancel order', () => {
      it('cancelOrder', () => {
        let mockCancelledOrder = {
          order_id: 2,
          customer_name: 'Customer 2',
          address: 'Hai Duong',
          phone: '03u545676',
          delivery_date: '2020-12-22T00:00:00.000Z',
          amount_money: 10,
          status: 'cancelled',
          created_at: '2020-12-07T00:00:00.000Z',
          updated_at: '2020-12-07T00:00:00.000Z'
        }
        jest.spyOn(orderService, 'cancel').mockImplementation((orderId) => of(mockCancelledOrder));
        controller.cancelOrder(2).subscribe((result) => {
          expect(result).toEqual(mockCancelledOrder);
        })
      })
    })
  })
});
