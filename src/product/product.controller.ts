import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Put,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Types } from 'mongoose';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateOrderDto } from 'src/users/dto/updare-order.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createProduct: CreateProductDto) {
    return await this.productService.create(createProduct);
  }

  @Roles(Role.Admin)
  @Get('orders')
  findAllOrders() {
    return this.productService.findAllOrders();
  }

  @Get(':product')
  @Public()
  async findOne(@Param('product') product: string) {
    const valor = await this.productService.findOne(product);
    return valor;
  }

  @Get()
  @Public()
  findAll() {
    return this.productService.findAll();
  }

  @Roles(Role.Admin)
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

  @Roles(Role.Admin)
  @Put()
  updateOrder(@Body() updateOrder: UpdateOrderDto, @Req() req: any) {
    return this.productService.createOrder(updateOrder, req.user.sub.id);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @Public()
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