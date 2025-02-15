import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CheckSubscription } from 'src/guards/CheckSubscription.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
