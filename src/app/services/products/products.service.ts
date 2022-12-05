import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private htpp: HttpClient) { }

  public api = { discount: 'http://localhost:3000/products' };


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