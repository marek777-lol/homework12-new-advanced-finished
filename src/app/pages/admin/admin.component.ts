import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { getAuth, signOut } from "firebase/auth";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private service: DiscountService, private router: Router, private accountService: AccountService, public afAuth: AngularFireAuth) { }

  ngOnInit(): void { }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

}
