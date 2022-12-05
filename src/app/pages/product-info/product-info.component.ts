import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public currentProduct!:any;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,

    ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getOne(id).subscribe(data => {
      this.currentProduct = data;
      console.log(data);
    })
  }

}
