/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //to handle the incoming request from the body we need @Body decorator
  @Post('add')
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const newId =  this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
    return {id:newId};
  }


  @Get('all')
  getTotalProducts() {
    return this.productService.getAllProduct();
  }

  @Get(':id')
  getOneProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId:string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number
  ){
    this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)  
return null}

    @Delete(':id')
    removeProduct(@Param('id') prodId:string){
        this.productService.deleteProduct(prodId);
        return null;
    }
}
