import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { Constant } from '../utils/constant'
import 'rxjs/add/operator/catch';
import { IUser } from '../interfaces/IEntity';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog } from '@angular/material';
@Injectable()
export class AuthService {
  public logged: boolean = false;
  myStorage = window.localStorage;
  public userInfo: BehaviorSubject<any>;
  public error: BehaviorSubject<string>;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.userInfo = new BehaviorSubject(null);
    this.error = new BehaviorSubject('');
  }
  checkLogin() {
    let data = this.myStorage.getItem('userInfo');
    if (data) {
      this.logged = true;
      this.userInfo.next(JSON.parse(data));
    }
    else
      this.logged = false;
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  login(username: string, password: string){
    const body = {
      "username": username,
      "password": password
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(Constant.SERVER + 'login', body, httpOptions).subscribe( res => {
        this.myStorage.setItem('userInfo', JSON.stringify(res));
        this.logged = true;
        this.userInfo.next(res);
        this.error.next('');
        this.dialog.closeAll();
      },
      error => {
        if(error.status === 401)
          this.error.next("Username hoặc password không chính xác.")
        else
          this.error.next(error.statusText)
        console.log(error);
      }  
    )

  }

  logout() {
    this.myStorage.clear()
    this.logged = false;
    this.userInfo.next(null);
  }
}
