import { CreateOrderDto } from "apps/setel-assigment/src/order/dto/createOrder.dto";
import { OrderByIdDto } from "apps/setel-assigment/src/order/dto/orderById.dto";
import { Observable } from "rxjs";

export interface OrderGrpcClient {
  createOrder(data: CreateOrderDto): Observable<any>
  cancelOrder(data: OrderByIdDto): Observable<any>
  checkStatus(data: OrderByIdDto): Observable<any>
  getLists(options: any): Observable<any>
}