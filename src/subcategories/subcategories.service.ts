import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from 'src/categories/interface/category.interface';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ISubcategory } from './interface/subcategory.interface';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel('subcategories') private SubcategoryModel: Model<ISubcategory>,
    @InjectModel('categories') private categoryModel: Model<ICategory>,
  ) {}
  async create(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<ISubcategory> {
    const newSubcategory = new this.SubcategoryModel(createSubcategoryDto);
    await this.categoryModel.updateOne(
      { _id: createSubcategoryDto.category },
      { $push: { subcategories: newSubcategory._id } },
    );
    return newSubcategory.save();
  }

  async findAll(): Promise<ISubcategory[]> {
    const SubcategoryData = await this.SubcategoryModel.find();
    if (!SubcategoryData || SubcategoryData.length == 0) {
      throw new NotFoundException('Categories data not found!');
    }
    return SubcategoryData;
  }

  async findOne(id: string): Promise<ISubcategory> {
    const existingSubcategory = await this.SubcategoryModel.findById(id).exec();
    if (!existingSubcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }
    return existingSubcategory;
  }

  async update(
    id: string,
    updateSubcategoryDto: UpdateSubcategoryDto,
  ): Promise<ISubcategory> {
    const existingSubcategory = await this.SubcategoryModel.findByIdAndUpdate(
      id,
      updateSubcategoryDto,
      { new: true },
    );
    if (!existingSubcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }
    return existingSubcategory;
  }

  async remove(id: string): Promise<ISubcategory> {
    const deletedSubcategory = await this.SubcategoryModel.findByIdAndDelete(
      id,
    );
    if (!deletedSubcategory) {
      throw new NotFoundException(`Student #${id} not found`);
    }
    return deletedSubcategory;
  }
}
