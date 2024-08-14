import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  password: string;

  @IsInt()
  @IsNotEmpty()
  readonly age: number;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  readonly birthday: Date;
}
