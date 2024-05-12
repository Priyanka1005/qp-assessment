import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports:[
    ProductsModule,
    AuthModule,
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
