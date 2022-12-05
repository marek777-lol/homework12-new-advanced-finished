import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { HttpClient } from '@angular/common/http';
import { percentage, ref, Storage } from '@angular/fire/storage';
import { deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-discount-admin',
  templateUrl: './discount-admin.component.html',
  styleUrls: ['./discount-admin.component.scss']
})
export class DiscountAdminComponent implements OnInit {
  public showMenuDiscount = false;
  public discountArray: any = [];
  public showSave = false;
  public index!: number;
  public img!: any;
  public showImage = false;
  public uploadPrecent!: number;
  public showProgress = false;

  constructor(private service: DiscountService, private htpp: HttpClient, private stroage: Storage) { }

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
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const stroageRef = ref(this.stroage, path);
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

  cleanInputs() {
    document.querySelector<HTMLInputElement>('.name')!.value = '';
    document.querySelector<HTMLInputElement>('.tittle')!.value = '';
    document.querySelector<HTMLInputElement>('.description')!.value = '';
  }

  getAll() {
    this.service.getAll().subscribe(data => {
      this.discountArray = data;
    })
  }

  showCreateDiscount() {
    if (this.showMenuDiscount === false) {
      this.showMenuDiscount = true;
    } else {
      this.showMenuDiscount = false;
    }
  }

  addDiscount() {
    if (document.querySelector<HTMLInputElement>('.name')!.value === '' || document.querySelector<HTMLInputElement>('.tittle')!.value === '' || document.querySelector<HTMLInputElement>('.description')!.value === '' || this.img === undefined) {
      console.log('wrong');

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
      this.cleanInputs();
      this.showImage = false;
      this.showMenuDiscount = false;
    }
  }

  delete(discount: any): any {
    this.service.delete(discount.id).subscribe(data => {
      this.getAll();
    })
    console.log(discount.id);
  }

  deleteImage(): void {
    const task = ref(this.stroage, this.img);
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

    this.showMenuDiscount = true;
    this.showSave = true;
    this.showImage = true;
  }

  saveDiscount() {
    const newDiscount = {
      name: document.querySelector<HTMLInputElement>('.name')?.value,
      tittle: document.querySelector<HTMLInputElement>('.tittle')?.value,
      description: document.querySelector<HTMLInputElement>('.description')?.value,
      image: this.img
    }
    this.showSave = false;
    this.service.edit(this.index, newDiscount).subscribe(data => {
      this.getAll();
    })

    this.cleanInputs();
    this.showImage = false;
    this.showMenuDiscount = false;
  }
}