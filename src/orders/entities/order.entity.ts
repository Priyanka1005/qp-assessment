import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  description: string;

  @Column()
  delivery: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  total_price: number;

  @Column()
  user_id: number;

  @Column()
  delivery_address: string;

  @CreateDateColumn()
  created_at: Date;
}
