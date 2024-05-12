import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('inventories')
export class Inventory {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'bigint' })
    product_id: number;

    @Column({ type: 'bigint' })
    quantity: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: Product;
}