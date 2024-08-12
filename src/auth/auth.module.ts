import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategies';
import { UesersService } from 'src/uesers/uesers.service';
import { UesersModule } from 'src/uesers/uesers.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  imports: [
    PassportModule,
    UesersModule,
    JwtModule.register({
      secret: 'Noah_handsome',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
