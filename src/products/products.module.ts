import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Inventory } from './entities/inventory.entity';
import { Order } from '../orders/entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Product,Inventory])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
