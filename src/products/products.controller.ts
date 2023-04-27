import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('product')
@ApiTags('product')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (_request, file, cb) => {
          cb(null, `${new Date().getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @Res() response,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    try {
      createProductDto.image = file.map((item) => item.filename);
      console.log(file.length);
      const newProduct = await this.ProductsService.create(createProductDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        newProduct,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: err,
      });
    }
  }
  @Get()
  async findAll(@Res() response) {
    try {
      const ProductData = await this.ProductsService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All Product data found successfully',
        ProductData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getProduct(@Res() response, @Param('id') id: string) {
    try {
      const existingProduct = await this.ProductsService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        existingProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateProduct(
    @Res() response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const existingProduct = await this.ProductsService.update(
        id,
        updateProductDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        existingProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Res() response, @Param('id') id: string) {
    try {
      const deletedProduct = await this.ProductsService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Product deleted successfully',
        deletedProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
