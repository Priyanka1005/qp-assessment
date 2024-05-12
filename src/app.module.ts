import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../db/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './utils/filters/global-exception.filter';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
