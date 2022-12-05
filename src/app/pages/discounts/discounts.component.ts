import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount/discount.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  public discountArray!:any;

  constructor(private service: DiscountService ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(data => {
      this.discountArray = data;
      console.log(data);
    })
  }

}
