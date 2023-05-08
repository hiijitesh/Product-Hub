import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb://honcadmin:honcadmin390@devapi.honc.io/NestJS_Jitesh?authMechanism=SCRAM-SHA-1&authSource=admin',
    ),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
