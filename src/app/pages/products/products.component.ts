import { analyzeAndValidateNgModules, ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productArray: any = [];

  constructor(private service: ProductsService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.productArray = data;
      console.log(data);
    })
  }

  btn1(product: any, value: boolean) {   
    if(value) {
      ++product.orderedProduct;
    } else if (!value && product.orderedProduct >= 1) {
      --product.orderedProduct;
    }
  }

  addToBasket(product: any) {      
    console.log(product);
    let basket: Array<any> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string); 
      if (basket.some(prod => prod.id == product.id)) {
        const index = basket.findIndex(prod => prod.id == product.id);
        basket[index].orderedProduct += product.orderedProduct;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    
    localStorage.setItem('basket', JSON.stringify(basket));
    product.orderedProduct = 0;
    this.orderService.changeBasket.next(true);
  }

}
