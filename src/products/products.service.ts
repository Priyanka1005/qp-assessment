import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { Product } from './entities/product.entity';
import { INVENTORY_ACTION, UpdateInventoryDto } from './dto/update-inventory';
import { UserService } from 'src/auth/user.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createProductDto: CreateProductDto):Promise<Product> {
    const { name, description, price } = createProductDto;
    const product = this.productRepository.create({ name, description, price });
    const savedProduct = await this.productRepository.save(product);
    const inventory = this.inventoryRepository.create({ product_id: savedProduct.id, quantity: 0 });
    await this.inventoryRepository.save(inventory);
    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['inventory'] });
  }

  async findOne(id: number): Promise<Product | undefined> {
    return this.productRepository.findOne({ where: { id }, relations: ['inventory'] });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | any> {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        return new NotFoundException(`Product with ID ${id} not exist`);;
      }
      const { name, description, price } = updateProductDto;
      product.name = name !== undefined ? name : product.name;
      product.description = description !== undefined ? description : product.description;
      product.price = price !== undefined ? price : product.price;

      return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateInventory(updateInventory:UpdateInventoryDto, product_id:number): Promise<Inventory | any> {
      const {quantity,action}=updateInventory;
      const inventory = await this.inventoryRepository.findOne({ where: { product_id } });
      if (!inventory) {
        return new NotFoundException(`Inventory for product with ID ${product_id} not found`);
      }
      inventory.quantity = action==INVENTORY_ACTION.INCREASE? (Number(inventory.quantity)+Number(quantity)): Math.max(0, (Number(inventory.quantity)-Number(quantity)));
      return this.inventoryRepository.save(inventory);
  }
}
