import { 
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('orders')
export class Order {
  @PrimaryColumn('order_id')
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
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}