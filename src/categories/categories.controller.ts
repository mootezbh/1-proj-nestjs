import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Res() response, @Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoriesService.create(
        createCategoryDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Category has been created successfully',
        newCategory,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get()
  async findAll(@Res() response) {
    try {
      const categoriesData = await this.categoriesService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All categories data found successfully',
        categoriesData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getCategory(@Res() response, @Param('id') id: string) {
    try {
      const existingCategory = await this.categoriesService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Category found successfully',
        existingCategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateCategory(
    @Res() response,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const existingCategory = await this.categoriesService.update(
        id,
        updateCategoryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully updated',
        existingCategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteCategory(@Res() response, @Param('id') id: string) {
    try {
      const deletedCategory = await this.categoriesService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Category deleted successfully',
        deletedCategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
