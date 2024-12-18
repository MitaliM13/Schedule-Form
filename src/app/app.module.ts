import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './Service/data.service';

import { LoginComponent } from './Components/login/login.component';
import { ParentFormComponent } from './Components/Form/parent-form/parent-form.component';
import { StepOneVehicleComponent } from './Components/Form/parent-form/step-one-vehicle/step-one-vehicle.component';
import { StepTwoDateComponent } from './Components/Form/parent-form/step-two-date/step-two-date.component';
import { StepThreeConfirmComponent } from './Components/Form/parent-form/step-three-confirm/step-three-confirm.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgArrayPipesModule } from 'ngx-pipes';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ParentFormComponent,
    StepOneVehicleComponent,
    StepTwoDateComponent,
    StepThreeConfirmComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    NgxMaterialTimepickerModule,
    NgArrayPipesModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  exports: [MatStepperModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
