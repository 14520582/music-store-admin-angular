import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
  progress: { percentage: number } = { percentage: 0 };
  constructor(
    private dialogRef: MatDialogRef<UpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private albumService : AlbumService,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService
  ) { 
    if(this.data.type === 0) {
      console.log(this.data.album)
      this.albumForm = this.formBuilder.group({
        name: [data.album.name, Validators.required ],
        artist: [data.album.artist, Validators.required ],
        price: [data.album.price, Validators.required ],
        releasedate: [new Date(data.album.releasedate), Validators.required ],
        genre: [data.album.genre, Validators.required ],
        cover: [data.album.cover],
        quantity: [data.album.quantity, Validators.required ],
        songs: [data.album.songs],
        singerSong: [null],
        genreSong: [null],
        nameSong: [''],
        description: [data.album.description, Validators.required ],
        coverOption: [ 1, Validators.required ]
      });
    }
    else{
      this.albumForm = this.formBuilder.group({
        name: ['', Validators.required ],
        artist: ['', Validators.required ],
        price: ['', Validators.required ],
        releasedate: [new Date(), Validators.required ],
        genre: ['', Validators.required ],
        cover: [''],
        quantity: [10, Validators.required ],
        songs: [[]],
        singerSong: [null],
        genreSong: [null],
        nameSong: [''],
        description: ['', Validators.required ],
        coverOption: [ 1, Validators.required ]
      });
    }
    this.currentFileUpload = new FileUpload();
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
  convertFormToAlbum() : IAlbum {
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
  confirm(){
    if(this.data.type === 0) 
    //console.log(this.convertFormToAlbum())
      this.albumService.edit({...this.convertFormToAlbum(), id: this.data.album.id});
    else {
      this.albumService.add(this.convertFormToAlbum());
    }
    this.dialogRef.close();
  }
  onNoClick() {
    this.dialogRef.close();
  }
  addSong() {
    const song = {
      name: this.albumForm.get('nameSong').value,
      singer: this.albumForm.get('singerSong').value,
      genre: this.albumForm.get('genreSong').value
    }
    let songs = this.albumForm.get('songs').value;
    songs.push(song)
    this.albumForm.get('songs').setValue(songs);
  }
}
