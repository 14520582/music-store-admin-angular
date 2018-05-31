import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { Constant } from '../utils/constant'
import 'rxjs/add/operator/catch';
import { IUser } from '../interfaces/IEntity';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';
@Injectable()
export class UserService {
  token: string;
  myStorage = window.localStorage;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.userInfo.subscribe(data => {
      this.token = data.token;
      console.log(data)
    })
  }

  editProfile(user: IUser): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    return this.http.put<any>(Constant.SERVER + 'account/update', user, httpOptions)
  }

  changePassword(id: number, oldPassword: string, newPassword: string): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    return this.http.put<any>(Constant.SERVER + 'account/changepassword?id=' + id + '&oldpassword=' + oldPassword + '&newpassword=' + newPassword, null, httpOptions)
  }
}
