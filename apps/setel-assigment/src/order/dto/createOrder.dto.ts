import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    description: 'The name of customer of order.',
  })
  @IsNotEmpty()
  @IsString()
  customer_name: string;

  @ApiProperty({
    description: 'The address of customer'
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'The phone of customer'
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'The delivery date of order'
  })
  @IsNotEmpty()
  delivery_date: Date;

  @ApiProperty({
    description: 'The amount of money of order.'
  })
  @IsNotEmpty()
  @IsNumber()
  amount_money: number;
}