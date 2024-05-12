import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user.service';
import { INVENTORY_ACTION } from 'src/products/dto/update-inventory';
import { Repository } from 'typeorm';
import { PlaceOrderDto } from './dto/place-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly productService: ProductsService
  ) {}
  async getOrder(user_id:number){
    return this.orderRepository.find({where:{user_id}});
  }
  async placeOrder(place_order:PlaceOrderDto, user_id:number): Promise<Order|any> {
      const {product_id, quantity} = place_order;
      const product = await this.productService.findOne(product_id);
      const user = await this.userService.findById(user_id);
      if (!product) {
        return new NotFoundException(`Product with ID ${product_id} not found`);
      }
      const total_price = product.price * quantity;
      const order = new Order();
      order.user_id = user_id;
      order.product_id = product_id;
      order.quantity = quantity;
      order.price = product.price;
      order.total_price = total_price;
      order.delivery_address = user.address;
      const orderDetail = await this.orderRepository.save(order)
      if(orderDetail){
        this.productService.updateInventory({action:INVENTORY_ACTION.DECREASE,quantity},product_id)
      }
      return orderDetail;
  }
}
