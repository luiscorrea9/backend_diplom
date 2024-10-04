import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Product, ProductSchema} from 'src/product/schemas/product.schema'; 
import {Category, CategorySchema} from 'src/category/schemas/category.schema'; 
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      {name: User.name,
        schema: UserSchema,}
    ,

    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
