import { Module } from '@nestjs/common';
import { UesersService } from './uesers.service';

@Module({
  providers: [UesersService],
  exports: [UesersService],
})
export class UesersModule {}
