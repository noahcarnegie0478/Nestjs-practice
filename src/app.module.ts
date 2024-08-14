/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import { UesersModule } from './uesers/uesers.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { execPath } from 'process';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UesersModule,
  ],
})
export class AppModule {}

//
