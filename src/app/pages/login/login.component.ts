import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public authForm!: any;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  initAuthForm() {
    this.authForm = {
      email: (document.querySelector('.username-input') as HTMLInputElement).value,
      password: (document.querySelector('.password-input') as HTMLInputElement).value,
    }
  }

  login(): void {
    // this.initAuthForm();
    // this.accountService.login(this.authForm).subscribe((data:any) => {
    //   if (data && data.length > 0) {
    //     const user = data[0];
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.accountService.isUserLogin$.next(true);
    //     if (user && user.role === 'USER') {
    //       this.router.navigate(['/cabinet']);
    //     } else if (user && user.role === 'ADMIN') {
    //       this.router.navigate(['/admin/discount']);
    //     }
    //   }
    // }, (e) => {
    //   console.log(e);
    // })
  }

}
