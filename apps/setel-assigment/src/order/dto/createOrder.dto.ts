import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customer_name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsDate()
  delivery_date: Date;
}