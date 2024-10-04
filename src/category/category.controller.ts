import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Types } from 'mongoose';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Public()
  async create(@Body() createCategory: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategory);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Category already exists');
      }

      throw error;
    }
  }

  @Get()
  @Public()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':category')
  @Public()
  async findOne(@Param('category') category: string) {
    return await this.categoryService.findOne(category);
  }

  @Put(':id')
  @Public()
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('El ID proporcionado no es válido.');
      }

      const category = await this.categoryService.update(id, updateCategoryDto);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @Public()
  async remove(@Param('id') id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('El ID proporcionado no es válido.');
      }

      const category = await this.categoryService.remove(id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
