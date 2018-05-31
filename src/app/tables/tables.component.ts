import { Component, OnInit } from '@angular/core';
import { IAlbum, IGenre, IArtist } from '../interfaces/IEntity';
import { AlbumService } from '../services/album.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Constant } from '../utils/constant';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, PageEvent } from '@angular/material';
import { UpdateFormComponent }  from '../update-form/update-form.component'
import { ArtistFormComponent } from '../artist-form/artist-form.component';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  albums : IAlbum[];
  totalOfAlbums: number = 0;
  isSearching: boolean = false;
  searchTerm: string = '';
  constructor(
    private albumService : AlbumService,
    private dialog: MatDialog
  ) {
    this.albumService.getPage(0, Constant.PAGE_SIZE)
    this.albumService.pageSubject.subscribe( page => {
      this.albums = page.content;
      this.totalOfAlbums = page.totalElements;
    })
  }
  ngOnInit() {
  }
  beginSearching() {
    this.isSearching = true;
    this.albumService.getPageOnSearching(0, Constant.PAGE_SIZE, this.searchTerm.toString().trim())
  }
  getColor(status) { 
    switch (status) {
      case 0:
        return 'red';
      case 1:
        return 'green';
    }
  }
  closeSearching() {
    this.isSearching = false;
    this.searchTerm = '';
    this.albumService.getPage(0, Constant.PAGE_SIZE)
  }
  onPaginateChange(event : PageEvent) {
    if(this.isSearching)
      this.albumService.getPageOnSearching(event.pageIndex, Constant.PAGE_SIZE, this.searchTerm.toString().trim())
    else
      this.albumService.getPage(event.pageIndex, Constant.PAGE_SIZE)
  }
  // 1: add, 0: edit
  openDialog(type : number, payload?: IAlbum) {
    this.dialog.open(UpdateFormComponent, {data: {type: type, album: payload ? payload : null}});
  }
  openArtistDialog() {
    this.dialog.open(ArtistFormComponent)
  }
  onChangeStatus(id: number) {
    this.albumService.changeAlbumStatus(id);
  }
}
