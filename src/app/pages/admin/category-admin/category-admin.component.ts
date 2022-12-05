import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { HttpClient } from '@angular/common/http';
import { percentage, ref, Storage } from '@angular/fire/storage';
import { deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.scss']
})
export class CategoryAdminComponent implements OnInit {

  public showProgress = false;
  public index!: number;
  public showSave!: boolean;
  public categories!: any;
  public showMenuCategory = false;
  public img!: any;
  public uploadPrecent: number = 0;
  public showImage = false;

  constructor(private service: CategoryService, private htpp: HttpClient, private storage: Storage) { }

  ngOnInit(): void {
    this.getAll();
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


  getAll() {
    this.service.getAll().subscribe(data => {
      console.log(data);
      this.categories = data;
    })
  }

  showMenu() {
    if (this.showMenuCategory === false) {
      this.showMenuCategory = true;
    } else {
      this.showMenuCategory = false;
    }
  }

  clearInputs() {
    document.querySelector<HTMLInputElement>('.name')!.value = '';
    document.querySelector<HTMLInputElement>('.tittle')!.value = '';
    document.querySelector<HTMLInputElement>('.description')!.value = ''
  }

  addCategory() {
    if (document.querySelector<HTMLInputElement>('.name')!.value === '' || document.querySelector<HTMLInputElement>('.tittle')!.value === '' || document.querySelector<HTMLInputElement>('.description')!.value === '' || this.img === undefined) {
      console.log('wrong');
      console.log(this.img);

    } else {
      const month = new Date().getUTCMonth() + 1;
      const day = new Date().getUTCDay() - 1;
      const newDiscount = {
        date: `${month}/${day}`,
        name: document.querySelector<HTMLInputElement>('.name')!.value,
        tittle: document.querySelector<HTMLInputElement>('.tittle')!.value,
        description: document.querySelector<HTMLInputElement>('.description')!.value,
        image: this.img
      }
      console.log(newDiscount);
      this.service.post(newDiscount).subscribe(data => {
        console.log(data);
        this.getAll();
      });
      this.clearInputs();
      this.showProgress = false;
      this.showImage = false;
      this.showMenuCategory = false;
    }
  }

  delete(category: any) {
    console.log(category.id);
    this.service.delete(category.id).subscribe(data => {
      this.getAll();
    })
    this.showProgress = false;
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

  edit(discount: any) {
    this.index = discount.id;

    document.querySelector<HTMLInputElement>('.name')!.value = discount.name;
    document.querySelector<HTMLInputElement>('.tittle')!.value = discount.tittle;
    document.querySelector<HTMLInputElement>('.description')!.value = discount.description;
    this.img = discount.image;
    console.log(discount.image);
    
    this.showImage = true;
    this.showSave = true;
    this.showMenuCategory = true;
  }

  saveDiscount() {
    const newDiscount = {
      name: document.querySelector<HTMLInputElement>('.name')?.value,
      tittle: document.querySelector<HTMLInputElement>('.tittle')?.value,
      description: document.querySelector<HTMLInputElement>('.description')?.value,
      image: this.img
    }
    this.service.edit(this.index, newDiscount).subscribe(data => {
      this.getAll();
    })
    this.clearInputs();
    this.showImage = false;
    this.showMenuCategory = false;
  }
}