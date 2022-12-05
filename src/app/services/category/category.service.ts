import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public api = { category: 'http://localhost:3000/categories' };

  constructor(private htpp: HttpClient) { }

  getAll() {
    return this.htpp.get(this.api.category);
  }

  post(category: any) {
    return this.htpp.post(this.api.category, category);
  }

  delete(id: number) {
    return this.htpp.delete(`${this.api.category}/${id}`)
  }

  edit(id: number, category: any) {
    return this.htpp.patch(`${this.api.category}/${id}`, category);
  }
}
