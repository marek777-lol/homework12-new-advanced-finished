import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { percentage } from 'rxfire/storage';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent implements OnInit {

  public products: any = [];
  public categories: any = [];
  public showMenuProduct: boolean = false;
  public showSave = false;
  public uploadPrecent!: number;
  public showProgress!: boolean;
  public img!: any;
  public showImage!: boolean;
  public index!: number;

  constructor(private categoryService: CategoryService, private service: ProductsService, private htpp: HttpClient, private storage: Storage) { }

  ngOnInit() {
    this.getAll();
    this.loadCategories();
  }


  getAll() {
    this.service.getAll().subscribe(data => {
      console.log(data);
      this.products = data;
    })
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

  onFileSelecte(event: any) {
    const file = event.target.files[0];

    this.uploadFile('images', file.name, file)
      .then(data => {
        this.img = data;
        this.showImage = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null) {
    this.showImage = false;
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const stroageRef = ref(this.storage, path);
        const task = uploadBytesResumable(stroageRef, file);
        await task;
        percentage(task).subscribe(data => {
          this.showProgress = true;
          this.uploadPrecent = data.progress;
        })
        url = await getDownloadURL(stroageRef);
        this.showProgress = false;
      }
      catch (e: any) {
        console.log(e);

      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.img);
    if (this.img !== undefined) {
      deleteObject(task).then(() => {
        console.log('file has been deleted');
        this.img = undefined;
        this.showImage = false;
      })
    }
    this.showProgress = false;
  }


  clearInputs() {
    document.querySelector<HTMLInputElement>('.name')!.value = '';
    document.querySelector<HTMLInputElement>('.path')!.value = '';
    document.querySelector<HTMLInputElement>('.ingredients')!.value = '';
    document.querySelector<HTMLInputElement>('.weight')!.value = '';
    document.querySelector<HTMLInputElement>('.price')!.value = '';

  }

  addProduct() {
    if (document.querySelector<HTMLInputElement>('.name')!.value === '' || document.querySelector<HTMLInputElement>('.path')!.value === '' || document.querySelector<HTMLInputElement>('.weight')!.value === '' || document.querySelector<HTMLInputElement>('.price')!.value  === '' || document.querySelector<HTMLInputElement>('.ingredients')!.value  === '' || this.img === undefined) {
    console.log('wrong');
    console.log(this.img);

    } else {
    const month = new Date().getUTCMonth() + 1;
    const day = new Date().getUTCDay() - 1;
    const newDiscount = {
      date: `${month}/${day}`,
      name: document.querySelector<HTMLInputElement>('.name')!.value,
      path: document.querySelector<HTMLInputElement>('.path')!.value,
      weight: document.querySelector<HTMLInputElement>('.weight')!.value,
      price: document.querySelector<HTMLInputElement>('.price')!.value,
      ingredients: document.querySelector<HTMLInputElement>('.ingredients')!.value,
      image: this.img,
      orderedProduct: 0
    }
    console.log(newDiscount);
    this.service.post(newDiscount).subscribe(data => {
      console.log(data);
      this.getAll();
    });
  }
    this.clearInputs();
    this.showProgress = false;
    this.showImage = true;
    this.showMenuProduct = false;
    this.img = '';
  }

  delete(product: any) {
    console.log(product.id);
    this.service.delete(product.id).subscribe(data => {
      this.getAll();
    })
    this.showProgress = false;
  }

  edit(product: any) {
    this.index = product.id;

    document.querySelector<HTMLInputElement>('.name')!.value = product.name
    document.querySelector<HTMLInputElement>('.path')!.value = product.path
    document.querySelector<HTMLInputElement>('.weight')!.value = product.weight
    document.querySelector<HTMLInputElement>('.price')!.value = product.price
    document.querySelector<HTMLInputElement>('.ingredients')!.value = product.ingredients

    this.img = product.image;
    console.log(product.image);

    this.showImage = true;
    this.showSave = true;
    this.showMenuProduct = true;
  }

  saveProduct() {
    const newProduct = {
      name: document.querySelector<HTMLInputElement>('.name')!.value,
      path: document.querySelector<HTMLInputElement>('.path')!.value,
      weight: document.querySelector<HTMLInputElement>('.weight')!.value,
      price: document.querySelector<HTMLInputElement>('.price')!.value,
      ingredients: document.querySelector<HTMLInputElement>('.ingredients')!.value,
      image: this.img,
      orderedProduct: 0
    }
    console.log(this.index);
    
    this.service.edit(this.index, newProduct).subscribe(data => {
      this.getAll();
    })
    this.showImage = false;
    this.showMenuProduct = false;
    this.showSave = false;
    this.clearInputs();
  }

  showMenu() {
  if (this.showMenuProduct === false) {
    this.showMenuProduct = true
  } else {
    this.showMenuProduct = false;
  }
}
}
