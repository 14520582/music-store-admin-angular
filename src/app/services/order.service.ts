import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IOrder } from '../interfaces/IEntity'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { Constant } from '../utils/constant'
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material';
import { UpdateFormComponent } from '../update-form/update-form.component'

@Injectable()
export class OrderService {
  pageSubject = new BehaviorSubject<any>([]);
  orders: IOrder[];
  token: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { 
    this.authService.userInfo.subscribe(data => {
      this.token = data.token;
      console.log(data)
    })
    this.getPage(0, Constant.PAGE_SIZE)
  }
  getPageOnSearching(page: number, pageSize: number, term: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    this.http.get<any>(Constant.SERVER + 'orders/search' + '?page=' + page + '&pagesize=' + pageSize + '&term=' + term, httpOptions).subscribe(data => {
      console.log(data)
      this.pageSubject.next(data);
      this.orders = data.content;
    })
  }
  getPage(page: number, pageSize: number) {
    console.log(this.token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      }),
    };
    this.http.get<any>(Constant.SERVER + 'orders/page?page=' + page + '&pagesize=' + pageSize, httpOptions).subscribe(data => {
      console.log(data)
      this.pageSubject.next(data);
      this.orders = data.content;
    })
  }
  nextStatus(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    this.http.put<IOrder>(Constant.SERVER + 'orders/change?idOrder=' + id,null, httpOptions).subscribe(data => {
      let index = this.orders.findIndex(order => order.id === data.id);
      this.orders[index] = data;
      let temp: any = this.pageSubject.getValue()
      temp.content = this.orders
      this.pageSubject.next(temp)
      console.log(data)
    },
      error => {
        console.log(error);
      }
    )
  }
}
