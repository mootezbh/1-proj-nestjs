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
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
@ApiTags('subcategories')
export class SubcategoriesController {
  constructor(private readonly categoriesService: SubcategoriesService) {}

  @Post()
  async create(
    @Res() response,
    @Body() createSubcategoryDto: CreateSubcategoryDto,
  ) {
    try {
      const newSubcategory = await this.categoriesService.create(
        createSubcategoryDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Subcategory has been created successfully',
        newSubcategory,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Subcategory not created!',
        error: 'Bad Request ' + err,
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
  async getSubcategory(@Res() response, @Param('id') id: string) {
    try {
      const existingSubcategory = await this.categoriesService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Subcategory found successfully',
        existingSubcategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateSubcategory(
    @Res() response,
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    try {
      const existingSubcategory = await this.categoriesService.update(
        id,
        updateSubcategoryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Subcategory has been successfully updated',
        existingSubcategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteSubcategory(@Res() response, @Param('id') id: string) {
    try {
      const deletedSubcategory = await this.categoriesService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Subcategory deleted successfully',
        deletedSubcategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
