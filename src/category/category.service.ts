import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createCategory: CreateCategoryDto) {
    const newCategory = new this.categoryModel(createCategory);
    return newCategory.save();
  }

  async findAll() {
    return this.categoryModel.find();
  }

  async findOne(name: string) {
    return this.categoryModel.findOne({ name });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.findById(id).lean();
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.productModel.updateMany(
        { category: category.name },
        { $set: { category: updateCategoryDto.name } },
      );

      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        { new: true },
      );

      return updatedCategory;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
