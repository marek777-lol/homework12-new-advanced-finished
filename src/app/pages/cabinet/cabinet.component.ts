import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  
  public currentUser!:any
  public email!: string;
  public fullName!: string;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.email = this.currentUser.email;
    this.fullName = this.currentUser.fullName;
    console.log(this.email);
  }

  logout() {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

}
