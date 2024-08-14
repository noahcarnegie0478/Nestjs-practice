import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/uesers/user.dto';
export class UpdateUsertDto extends PartialType(CreateUserDto) {}
