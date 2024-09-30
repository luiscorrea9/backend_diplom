import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Category} from 'src/schemas/category.schema'; 


@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategory: CreateCategoryDto) {
    const newCategory = new this.categoryModel(createCategory);
    return newCategory.save();
  }

  async findAll() {
    return this.categoryModel.find();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  async update(id: string, category: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, category, {new: true});
  }

  async remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
