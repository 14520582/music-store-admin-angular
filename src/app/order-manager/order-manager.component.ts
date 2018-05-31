import { Component, OnInit } from '@angular/core';
import { IOrder, IDetailsOrder } from '../interfaces/IEntity';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Constant } from '../utils/constant';
import { Subscription } from 'rxjs/Subscription';
import { PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ConfirmDialog } from '../update-form/update-form.component';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.scss']
})
export class OrderManagerComponent implements OnInit {
  orders: IOrder[];
  totalOfOrders: number = 0;
  isSearching: boolean = false;
  searchTerm: string = '';
  status: number = 3;
  constructor(
    private orderService: OrderService,
    private matDialog: MatDialog
  ) {
    this.orderService.getPage(0, Constant.PAGE_SIZE)
    this.orderService.pageSubject.subscribe(page => {
      this.orders = page.content;
      this.totalOfOrders = page.totalElements;
    })
  }
  getSum(list: IDetailsOrder[]) {
    let sum: number = 0;
    list.map(item => {
      sum += item.quantity * item.album.price
    })
    return sum;
  }
  beginSearching() {
    this.isSearching = true;
    if (this.status == 3)
      this.orderService.getPageOnSearching(0, Constant.PAGE_SIZE, this.searchTerm)
    else
      this.orderService.getPageOnSearchingByStatus(0, Constant.PAGE_SIZE, this.searchTerm, this.status)
  }
  getColor(status) {
    switch (status) {
      case 0:
        return 'green';
      case 1:
        return 'blue';
      case 2:
        return 'red';
    }
  }
  nextStatus(id: number) {
    let ref = this.matDialog.open(ConfirmDialog, { data: { title: `Are you sure you want to transfer ORDER ${id} to next status?` } })
    ref.afterClosed().subscribe(data => {
      if (data === 1)
        this.orderService.nextStatus(id)
    })
  }
  getTitleButton(status) {
    switch (status) {
      case 0:
        return 'Confirm';
      case 1:
        return 'Done';
      case 2:
        return 'Done';
    }
  }
  closeSearching() {
    this.isSearching = false;
    this.searchTerm = '';
    if (this.status == 3)
      this.orderService.getPage(0, Constant.PAGE_SIZE)
    else
      this.orderService.getPageByStatus(0, Constant.PAGE_SIZE, this.status)
  }
  onPaginateChange(event: PageEvent) {
    if (this.isSearching) {
      if (this.status == 3)
        this.orderService.getPageOnSearching(event.pageIndex, Constant.PAGE_SIZE, this.searchTerm)
      else
        this.orderService.getPageOnSearchingByStatus(event.pageIndex, Constant.PAGE_SIZE, this.searchTerm, this.status)
    }
    else {
      if (this.status == 3)
        this.orderService.getPage(event.pageIndex, Constant.PAGE_SIZE)
      else
        this.orderService.getPageByStatus(event.pageIndex, Constant.PAGE_SIZE, this.status)
    }
  }
  ngOnInit() {
  }
  changeStatus(){
    if (this.isSearching) {
      if (this.status == 3)
        this.orderService.getPageOnSearching(0, Constant.PAGE_SIZE, this.searchTerm)
      else
        this.orderService.getPageOnSearchingByStatus(0, Constant.PAGE_SIZE, this.searchTerm, this.status)
    }
    else {
      if (this.status == 3)
        this.orderService.getPage(0, Constant.PAGE_SIZE)
      else
        this.orderService.getPageByStatus(0, Constant.PAGE_SIZE, this.status)
    }
  }
}
