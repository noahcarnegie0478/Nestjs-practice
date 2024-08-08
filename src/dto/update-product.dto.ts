import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from 'src/products/product.dto';
export class UpdateProductDto extends PartialType(CreateProductDto) {}
