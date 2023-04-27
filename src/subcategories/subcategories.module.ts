import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { subcategorySchema } from './entities/subcategory.entity';
import { categorySchema } from 'src/categories/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'subcategories', schema: subcategorySchema },
      { name: 'categories', schema: categorySchema },
    ]),
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
