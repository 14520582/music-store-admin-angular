import { NgModule } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, MatPaginatorModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatExpansionModule, MatPaginatorModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule,MatListModule
  ],
  exports: [
    MatButtonModule, MatExpansionModule,MatCheckboxModule, MatPaginatorModule, MatNativeDateModule, MatDatepickerModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule
  ],
})
export class MaterialModule { }