import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  public api = { discount: 'http://localhost:3000/discounts' };

  constructor(private htpp: HttpClient) { }

  getAll() {
    return this.htpp.get(this.api.discount);
  }

  post(discount: any) {
    return this.htpp.post(this.api.discount, discount);
  }

  delete(id: number) {
    return this.htpp.delete(`${this.api.discount}/${id}`);
  }

  edit(id: number, discount: any) {
    return this.htpp.patch(`${this.api.discount}/${id}`, discount);
  }

  getOne(id: number) {
    return this.htpp.get(`${this.api.discount}/${id}`);
  }
}