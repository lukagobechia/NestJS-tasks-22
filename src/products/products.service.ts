import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      title: 'iphone 13',
      price: 2000,
      desc: 'good',
    },
    {
      id: 2,
      title: 'iphone 13',
      price: 2000,
      desc: 'good',
    },
    {
      id: 3,
      title: 'iphone 13',
      price: 2000,
      desc: 'good',
    },
  ];
  private discountedProducts = [
    {
      id: 1,
      title: 'iphone 13',
      price: 1000,
      desc: 'good',
    },
    {
      id: 2,
      title: 'iphone 13',
      price: 1000,
      desc: 'good',
    },
    {
      id: 3,
      title: 'iphone 13',
      price: 1000,
      desc: 'good',
    },
  ];
  create(createProductDto: CreateProductDto) {
    const lastID = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      id: lastID + 1,
      title: createProductDto.title,
      price: createProductDto.price,
      desc: createProductDto.desc,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  findAll(subscriptionStatus:string) {
    if(subscriptionStatus === 'valid')
      return this.discountedProducts;
    else return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((el) => el.id === id);
    if (!product)
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);
    if (!product)
      throw new HttpException('product not found', HttpStatus.BAD_REQUEST);
    product.title = updateProductDto.title || product.title;
    product.price = updateProductDto.price || product.price;
    product.desc = updateProductDto.desc || product.desc;
    return ['Updated product: ', product];
  }

  remove(id: number) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('product id not found', HttpStatus.BAD_REQUEST);
    this.products.splice(index, 1);
    return 'Deleted';
  }
}
