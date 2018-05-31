import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { AuthService } from './services/auth.service';
import { AlbumService } from './services/album.service';
import { OrderService } from './services/order.service';
import { LoginComponent } from './login/login.component';
import { UpdateFormComponent, ConfirmDialog } from './update-form/update-form.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MyDateAdapter } from './utils/my-date-adapter'
import { Constant } from './utils/constant';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { UserService } from './services/user.service';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { GenreFormComponent } from './genre-form/genre-form.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    LoginComponent,
    UpdateFormComponent,
    ConfirmDialog,
    OrderManagerComponent,
    OrderStatusPipe,
    ArtistFormComponent,
    GenreFormComponent
  ],
  entryComponents: [UpdateFormComponent, ConfirmDialog, ArtistFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    NavbarModule,
    ReactiveFormsModule,
    FooterModule,
    FlexLayoutModule,
    SidebarModule,
    MaterialModule,
    RouterModule,
    CdkTableModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    LbdModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: Constant.MY_DATE_FORMATS },
    AuthService,
    AlbumService,
    OrderService,
    FirebaseService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
