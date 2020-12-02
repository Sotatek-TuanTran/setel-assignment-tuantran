import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

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

  @Column({ nullable: true, default: 'created'})
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}