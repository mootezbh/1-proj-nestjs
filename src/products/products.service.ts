import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('product') private ProductModel: Model<IProduct>) {}
  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const newProduct = new this.ProductModel(createProductDto);
    return newProduct.save();
  }

  async findAll(): Promise<IProduct[]> {
    const ProductData = await this.ProductModel.find();
    if (!ProductData || ProductData.length == 0) {
      throw new NotFoundException('product data not found!');
    }
    return ProductData;
  }

  async findOne(id: string): Promise<IProduct> {
    const existingProduct = await this.ProductModel.findById(id).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return existingProduct;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const existingProduct = await this.ProductModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!existingProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return existingProduct;
  }

  async remove(id: string): Promise<IProduct> {
    const deletedProduct = await this.ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return deletedProduct;
  }
}
