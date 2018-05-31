import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AlbumService } from '../services/album.service';
import { ICountry, IArtist } from '../interfaces/IEntity';
import { MatDialog } from '@angular/material';
import { ConfirmDialog } from '../update-form/update-form.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent implements OnInit {
  artistForm: FormGroup;
  countries: ICountry[];
  error: string = ''
  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
    this.artistForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: [null, Validators.required],
      sex: [0, Validators.required],
      yearofbirth: [1980, Validators.required]
    });
    this.albumService.getAllCountries().subscribe(data => {
      this.countries = data;
    })
  }

  ngOnInit() {
  }
  confirm() {
    let ref = this.matDialog.open(ConfirmDialog, {data: { title: 'Are you sure you want to save this data?'}})
    ref.afterClosed().subscribe(type => {
      if(type === 1){
        const artist: IArtist = {
          name: this.artistForm.controls['name'].value,
          country: this.artistForm.controls['country'].value,
          sex: this.artistForm.controls['sex'].value,
          yearofbirth: this.artistForm.controls['yearofbirth'].value,
        }
        this.albumService.addArtist(artist).subscribe(
          data => {
            if(data) {
              this.artistForm.controls['name'].setValue('')
              this.artistForm.controls['country'].setValue(null)
              this.artistForm.controls['sex'].setValue(0)
              this.artistForm.controls['yearofbirth'].setValue(1980)
              this.snackBar.open('Add new artist', 'Done',{
                duration: 2000
              });
            }else{
              this.error = 'Có lỗi xảy ra'
            }
          },
          error => {
            this.error = error.statusText;
          }
        )
      }
    })
  }
}
