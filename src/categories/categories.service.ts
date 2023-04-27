import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interface/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories') private categoryModel: Model<ICategory>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  async findAll(): Promise<ICategory[]> {
    const categoryData = await this.categoryModel.find();
    if (!categoryData || categoryData.length == 0) {
      throw new NotFoundException('Categories data not found!');
    }
    return categoryData;
  }

  async findOne(id: string): Promise<ICategory> {
    const existingCategory = await this.categoryModel.findById(id).exec();
    if (!existingCategory) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return existingCategory;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    const existingCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!existingCategory) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return existingCategory;
  }

  async remove(id: string): Promise<ICategory> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new NotFoundException(`Student #${id} not found`);
    }
    return deletedCategory;
  }
}
