import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthenticationGuard } from 'src/utils/guards/authentication.guard';
import { UpdateInventoryDto } from './dto/update-inventory';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PlaceOrderDto } from '../orders/dto/place-order.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthenticationGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthenticationGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Post(':product_id/inventory')
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthenticationGuard)
  updateInventory(@Param('product_id') product_id: number, @Body() updateInventory: UpdateInventoryDto) {
    return this.productsService.updateInventory(updateInventory,product_id);
  }
}
