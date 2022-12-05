import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountService } from 'src/app/services/discount/discount.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public currentProduct!: any;

  constructor(private discountService: DiscountService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.discountService.getOne(id).subscribe(data => {
      this.currentProduct = data;
      console.log(data);
    })
  }

}
