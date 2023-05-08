/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') private readonly productModel : Model<Product>){}

  async insertProduct(title: string, desc: string, price: number) {
    const currentProduct = new this.productModel({
			title,
			description:desc,
			price
		});

		const newProduct = await currentProduct.save();
		// console.log(newProduct);
		
    return newProduct.id as string;
  }

	async getAllProduct(){
		const products = await this.productModel.find().exec();
		// console.log(products);
		
		return products.map(prods=>({
			id:prods.id,
			title:prods.title,
			description:prods.description,
			price:prods.price
		}))
	}

	async getSingleProduct(productId:string){
		const oneProduct = await this.findProduct(productId);
		return {
			id:oneProduct.id,
			title:oneProduct.title,
			description:oneProduct.description,
			price:oneProduct.price
		}
	}

	async updateProduct(productId:string, title:string, desc:string, price:number){

		const updatedProduct = await this.findProduct(productId)

		if(title){
			updatedProduct.title = title;
		}
		if(desc){
			updatedProduct.description = desc;
		}
		if(price){
			updatedProduct.price = price
		}

		updatedProduct.save()
	}

	async deleteProduct(productId:string){

		try {
			await this.productModel.findByIdAndRemove({_id:productId})	
			
		} catch (error) {
			
		}		 throw new NotFoundException("Item for deletion Not Found")
	}

	private async findProduct(id:string):Promise<Product>{
		let product;
		try {
			 product = await this.productModel.findById(id).exec()
		} catch (error) {
			throw new NotFoundException('Could not find product.');

		}
		
		if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product
	}
}
