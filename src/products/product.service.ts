import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  //   async insertModel(title: string, desc: string, price: number) {
  //     const newProduct = new this.productModel({
  //       title,
  //       description: desc,
  //       price,
  //     });

  //     const result = await newProduct.save();
  //     return result;
  //   }
  async insertModel(createDTo: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createDTo);

    const result = await newProduct.save();
    return result;
  }
  async findAll(): Promise<Product[]> {
    const Productdata = await this.productModel.find().exec();
    if (!Productdata || Productdata.length === 0) {
      throw new NotFoundException('No data to fetch');
    }
    return Productdata;
  }
  async getProduct(id: string): Promise<Product> {
    const existing_Product = await this.productModel.findById(id).exec();
    if (!existing_Product) {
      throw new NotFoundException(`Product which has ${id} is not exist`);
    }
    return existing_Product;
  }
  async deleteProduct(id: string): Promise<Product> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`The product of ${id} is not deleted yet`);
    }
    return result;
  }
  async updateProduct(
    id: string,
    updateProd: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProd, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('the product is unscussessfully updated');
    }
    return updatedProduct;
  }
}
