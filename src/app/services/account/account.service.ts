import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();

  public api = { auth: 'http://localhost:3000/auth' };

  constructor(private http: HttpClient) { }

  login(credential: any) {
    return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`);
  }
}
