import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, BadRequestException, NotFoundException, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Types } from 'mongoose';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProduct: CreateProductDto) {
      return await this.productService.create(createProduct);
  }

  @Get()
  async findOne(@Query('product') product: string) {
    const valor = await this.productService.findOne(product);
    console.log(valor)
    return valor;
   
  }
 
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProduct: UpdateProductDto) {
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
