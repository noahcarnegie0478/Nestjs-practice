import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import { UesersModule } from './uesers/uesers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://brucehoang99:58inDiCGgez9HP5H@noah.a5xn1hz.mongodb.net/',
    ),
    AuthModule,
    UesersModule,
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
  ],
})
export class AppModule {}

//
