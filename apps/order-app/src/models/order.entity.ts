import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

export enum OrderStatus {
  CREATED = 'created',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered'
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  customer_name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  delivery_date: Date;

  @Column()
  amount_money: number;

  @Column({ 
    type: 'enum',
    enum: OrderStatus,
    nullable: true,
    default: OrderStatus.CREATED
  })
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}