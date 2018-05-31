import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/IEntity';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: IUser = null
  userForm: FormGroup;
  myStorage = window.localStorage;
  newPassForm: FormGroup;
  passError: string = '';
  updateError: string = ''
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      address: ['']
    });
    this.newPassForm = this.formBuilder.group({
      new: ['', Validators.required],
      confirm: ['', Validators.required],
      old: ['', Validators.required]
    })
    this.authService.userInfo.subscribe(data => {
      this.userData = data;
      this.userForm.controls['email'].setValue(data.email);
      this.userForm.controls['address'].setValue(data.address);
      this.userForm.controls['phone'].setValue(data.phone);
      this.userForm.controls['name'].setValue(data.name);
      console.log(data)
      
    })
  }
  updateProfile() {
    const newInfo = {
      id: this.userData.id,
      username: this.userData.username,
      email: this.userForm.controls['email'].value,
      phone: this.userForm.controls['phone'].value,
      address: this.userForm.controls['address'].value,
      name: this.userForm.controls['name'].value,
    }
    this.userService.editProfile(newInfo).subscribe(res => {
      if(res){
        this.myStorage.setItem('userInfo', JSON.stringify(res));
        this.authService.userInfo.next(res);
      }else{
        this.updateError = 'Có lỗi xảy ra';
      }
    },
    error => {
      this.updateError = error.statusText;
    }
  )
  }
  changePassword() {
    if (this.checkNewPassword()) {
      this.userService.changePassword(this.userData.id, this.newPassForm.controls['old'].value, this.newPassForm.controls['new'].value).subscribe(res => {
          console.log(res)
          if(res){
            this.passError = '';
            this.newPassForm.controls['old'].setValue('')
            this.newPassForm.controls['new'].setValue('')
            this.newPassForm.controls['confirm'].setValue('')
          }else{
            this.passError = 'Mật khẩu không chính xác';
          }
        },
        error => {
          this.passError = error.statusText;
        }
      )
    } else {
      this.passError = 'Confirm password is not correct';
    }
  }
  checkNewPassword() {
    if (this.newPassForm.controls['new'].value === this.newPassForm.controls['confirm'].value)
      return true;
    return false
  }
  ngOnInit() {
  }

}
