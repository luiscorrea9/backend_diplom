import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, BadRequestException, NotFoundException, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Types } from 'mongoose';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProduct: CreateProductDto) {
    try {
      return await this.productService.create(createProduct);
    } catch (error) {

      if (error.code === 11000) {

        throw new ConflictException('Product already exists')
        
      }

      throw error;
      
    }
    
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
async findOne(@Param('id') id: string) {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('El ID proporcionado no es válido.');
    }
    
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
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
