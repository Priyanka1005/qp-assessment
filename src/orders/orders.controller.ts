import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, SetMetadata } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { PlaceOrderDto } from './dto/place-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  getOrder(@Req() req) {
    return this.ordersService.getOrder(req.user_id);
  }

  @Post('place-order')
  @SetMetadata('roles', ['user'])
  @UseGuards(AuthenticationGuard)
  placeOrder(@Body() placeOrder: PlaceOrderDto, @Req() req) {
    return this.ordersService.placeOrder(placeOrder,req.user_id);
  }
}
