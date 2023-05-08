/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Body, Controller, Post, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Post, Param, UseGuards,Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //to handle the incoming request from the body we need @Body decorator

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addProduct(
    @Body () completeBody : {title:string, description:string, price:number}
  ) {
    const newId =  await this.productService.insertProduct(completeBody.title, completeBody.description, completeBody.price);
    return {id:newId};
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getTotalProducts() {
    return await this.productService.getAllProduct();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOneProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }
    
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId:string,
    @Body () completeBody : {title:string, description:string, price:number}


  ){
    await this.productService.updateProduct(prodId, completeBody.title, completeBody.description, completeBody.price)
return null}


  @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async removeProduct(@Param('id') prodId:string){
        await this.productService.deleteProduct(prodId);
        return null;
    }
}
