import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Product} from 'src/schemas/product.schema'; 
import {Category} from 'src/schemas/category.schema'; 

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>,
  @InjectModel(Category.name) private categoryModel: Model<Category>) {}

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

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  update(id: string, Product: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, Product, {new: true});
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
