import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  BadRequestException,
  NotFoundException,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Types } from 'mongoose';
import { UpdateOrderDto } from 'src/users/dto/updare-order.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProduct: CreateProductDto) {
    return await this.productService.create(createProduct);
  }

  @Get(':product')
  async findOne(@Param('product') product: string) {
    const valor = await this.productService.findOne(product);
    console.log(valor);
    return valor;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('El ID proporcionado no es válido.');
      }

      const product = await this.productService.update(id, updateProduct);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put()
  updateOrder(@Body() updateOrder: UpdateOrderDto, @Req() req: any){
    return this.productService.createOrder(updateOrder, req.user.sub.id)
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('El ID proporcionado no es válido.');
      }

      const product = await this.productService.remove(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
