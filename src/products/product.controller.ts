/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  HttpStatus,
  Param,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import { response } from 'express';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@Controller(`product`)
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private productService: ProductService) {}

  @Post()
  //   async Insert_Product(
  //     @Body('title') prodtitle: string,
  //     @Body('description') proddescription: string,
  //     @Body('price') prodprice: number,
  //   ) {
  //     const generatedId = await this.productService.insertModel(
  //       prodtitle,
  //       proddescription,
  //       prodprice,
  //     );
  async Insert_user(@Res() response, @Body() product: CreateProductDto) {
    const generatedId = await this.productService.insertModel(product);
    return response.status(HttpStatus.CREATED).json({
      message: 'Product has been added to database',
      generatedId,
    });
  }
  @Get()
  async GetAll() {
    return this.productService.findAll();
  }
  @Get(':id')
  async Get_Product(@Res() response, @Param('id') id: string) {
    const Final_Product = await this.productService.getProduct(id);
    try {
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Successfully in fetch Product', Final_Product });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
  @Delete(':id')
  async Remove(@Res() response, @Param('id') id: string) {
    const rm_item = await this.productService.deleteProduct(id);
    try {
      return response
        .status(HttpStatus.OK)
        .json({ message: 'itm removed', rm_item });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
  @Put(':id')
  async Updated(
    @Res() response,
    @Param('id') id: string,
    @Body() UpdateProduct: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      UpdateProduct,
    );
    try {
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Updated success', updatedProduct });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
