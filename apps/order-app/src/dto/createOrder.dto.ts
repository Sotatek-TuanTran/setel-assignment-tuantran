export class CreateOrderDto {
  customer_name: string;

  address: string;

  phone: string;

  delivery_date: Date;

  amount_money: number;
}