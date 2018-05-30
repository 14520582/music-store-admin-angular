import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlbumService } from '../services/album.service';
import { IAlbum, IGenre, IArtist, FileUpload } from '../interfaces/IEntity';
import { ErrorStateMatcher } from '@angular/material/core';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  albumForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  dataGenres: IGenre[];
  dataArtists: IArtist[];
  progress: { percentage: number } = { percentage: 0 };
  constructor(
    private dialogRef: MatDialogRef<UpdateFormComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService
  ) {
    if (this.data.type === 0) {
      console.log(this.data.album)
      this.albumForm = this.formBuilder.group({
        name: [data.album.name, Validators.required],
        artist: [data.album.artist, Validators.required],
        price: [data.album.price, Validators.required],
        releasedate: [new Date(data.album.releasedate), Validators.required],
        genre: [data.album.genre, Validators.required],
        cover: [data.album.cover],
        quantity: [data.album.quantity, Validators.required],
        songs: [data.album.songs],
        singerSong: [null],
        genreSong: [null],
        nameSong: [''],
        description: [data.album.description],
        coverOption: [1, Validators.required]
      });
    }
    else {
      this.albumForm = this.formBuilder.group({
        name: ['', Validators.required],
        artist: [null, Validators.required],
        price: ['', Validators.required],
        releasedate: [new Date(), Validators.required],
        genre: [null, Validators.required],
        cover: [''],
        quantity: [10, Validators.required],
        songs: [[]],
        singerSong: [null],
        genreSong: [null],
        nameSong: [''],
        description: ['', Validators.required],
        coverOption: [1, Validators.required]
      });
    }
    this.currentFileUpload = new FileUpload();
    this.albumService.getAllGenres().subscribe( data => {
      this.dataGenres = data
    })
    this.albumService.getAllArtists().subscribe( data => {
      this.dataArtists = data
    })
  }
  ngOnInit() {
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  async upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload.file = file;
    const url = await this.firebase.pushFileToStorage(this.currentFileUpload, this.progress);
    console.log(url)
    this.albumForm.get('cover').setValue(url);
  }
  convertFormToAlbum(): IAlbum {
    return {
      name: this.albumForm.get('name').value,
      artist: this.albumForm.get('artist').value,
      price: this.albumForm.get('price').value,
      releasedate: this.albumForm.get('releasedate').value.getTime(),
      genre: this.albumForm.get('genre').value,
      cover: this.albumForm.get('coverOption').value == 1 ? this.albumForm.get('cover').value : this.currentFileUpload.url,
      quantity: this.albumForm.get('quantity').value,
      songs: this.albumForm.get('songs').value,
      description: this.albumForm.get('description').value
    }
  }
  confirm() {
    if (this.data.type === 0)
      //console.log(this.convertFormToAlbum())
      this.albumService.edit({ ...this.convertFormToAlbum(), id: this.data.album.id });
    else {
      this.albumService.add(this.convertFormToAlbum());
    }
    this.dialogRef.close();
  }
  onNoClick() {
    this.dialogRef.close();
  }
  addSong() {

    if (this.data.type === 0) { 
      const song = {
        name: this.albumForm.get('nameSong').value,
        singer: this.albumForm.get('singerSong').value,
        genre: this.albumForm.get('genreSong').value,
        album: { id: this.data.album.id}
      }
      let ref = this.matDialog.open(ConfirmDialog, { data: { title: 'This song will be permanently persisted into database' } })
      ref.afterClosed().subscribe(type => {
        if (type === 1) {
          this.albumService.addSong(song).subscribe(data => {
            let songs = this.albumForm.get('songs').value;
            songs.push(data)
            this.albumForm.get('songs').setValue(songs);
          })
          this.albumForm.get('nameSong').setValue('');
          this.albumForm.get('genreSong').setValue(null);
          this.albumForm.get('singerSong').setValue(null);
        }
      })
    }
    else {
      const song = {
        name: this.albumForm.get('nameSong').value,
        singer: this.albumForm.get('singerSong').value,
        genre: this.albumForm.get('genreSong').value
      }
      let songs = this.albumForm.get('songs').value;
      songs.push(song)
      this.albumForm.get('songs').setValue(songs);
      this.albumForm.get('nameSong').setValue('');
      this.albumForm.get('genreSong').setValue(null);
      this.albumForm.get('singerSong').setValue(null);
    }
  }
  deleteSong(id: number) {
    if (this.data.type === 0) {
      let ref = this.matDialog.open(ConfirmDialog, { data: { title: 'Item will be permanently deleted' } })
      ref.afterClosed().subscribe(data => {
        if (data === 1) {
          this.albumService.deleteSong(this.albumForm.get('songs').value[id].id);
          let songs = this.albumForm.get('songs').value;
          songs.splice(id, 1);
          this.albumForm.get('songs').setValue(songs);
        }
      })
    } else {
      let songs = this.albumForm.get('songs').value.filter((obj, index) => index !== id);
      this.albumForm.get('songs').setValue(songs);
    }
  }

}
@Component({
  selector: 'confirm-dialog',
  templateUrl: '/confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    private albumService: AlbumService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(0);
  }
  onConfirm(): void {
    this.dialogRef.close(1);
  }

}
