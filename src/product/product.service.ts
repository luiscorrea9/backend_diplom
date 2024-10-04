import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Product} from 'src/product/schemas/product.schema'; 
import {Category} from 'src/category/schemas/category.schema'; 
import { UpdateOrderDto } from 'src/users/dto/updare-order.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>,
  @InjectModel(Category.name) private categoryModel: Model<Category>,
  @InjectModel(User.name) private userModel: Model<User>
) {}

  async create(createProduct: CreateProductDto) {
    const findCategory = await this.categoryModel.findOne({name: createProduct.category});
    console.log(findCategory)
    if(!findCategory) throw new NotFoundException('Category not found')
    const newProduct = new this.productModel(createProduct);
    return newProduct.save();
    
    
  }

  async findAll() {
    return this.productModel.find();
  }

  async findOne(name: string) {
    return this.productModel.findOne({name});
  }

  update(id: string, Product: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, Product, {new: true});
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  createOrder(Product: UpdateOrderDto, id: string){
    return this.userModel.findByIdAndUpdate(id, {$push: {orders: Product}, new: true})
  }
}
