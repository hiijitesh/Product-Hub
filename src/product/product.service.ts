/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private product: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const productId = Math.random().toString();
    const currentProduct = new Product(productId, title, desc, price);
    this.product.push(currentProduct);
    return productId;
  }

	getAllProduct(){
		return [...this.product]
	}

	getSingleProduct(productId:string){
		const oneProduct = this.findProduct[productId][0];
		return { ...oneProduct };
	}

	updateProduct(productId:string, title:string, desc:string, price:number){
		const [product, index] = this.findProduct(productId);

		const updatedProduct = { ...product};

		if(title){
			updatedProduct.title = title;
		}
		if(desc){
			updatedProduct.description = desc;
		}
		if(price){
			updatedProduct.price = price
		}

		this.product[index] = updatedProduct
	}

	deleteProduct(productId:string){
		const index = this.findProduct(productId)[1];

		this.product.splice(index, 1)
	}

	private findProduct(id:string):[Product, number]{
		const prodIndex = this.product.findIndex(prod => prod.id === id);
		const product = this.product[prodIndex];
		if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, prodIndex];
	}
}
