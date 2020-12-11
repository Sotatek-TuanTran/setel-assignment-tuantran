import { CreateOrderDto } from "apps/setel-assigment/src/order/dto/createOrder.dto";
import { OrderByIdDto } from "apps/setel-assigment/src/order/dto/orderById.dto";
import { Observable } from "rxjs";

export interface IPagination {
  page?: number;
  perPage?: number;
}

export interface IOrderGrpcClient {
  getLists(options: IPagination): Observable<any>
  createOrder(data: CreateOrderDto): Observable<any>
  cancelOrder(data: OrderByIdDto): Observable<any>
  checkStatus(data: OrderByIdDto): Observable<any>
}