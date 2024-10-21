import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { StepOneVehicleComponent } from './step-one-vehicle/step-one-vehicle.component';
import { StepTwoDateComponent } from './step-two-date/step-two-date.component';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css']
})
export class ParentFormComponent implements OnInit {
  data: any[] = [];
  errorMessage: string = '';
  currentStep: number = 1;

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataService.getData().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
      },
      (error) => {
        console.error("Error Fetching data", error);
        this.errorMessage = "Failed to load data. Please try again later.";
      }
    );
  }

  openDialog(): void {
    // Opens the first step of the form
    this.dialog.open(StepOneVehicleComponent).afterClosed().subscribe(result => {
      if (result) {
        this.currentStep = 2; // Move to the next step after closing the first dialog
        this.openSpecificDialog();
      }
    });
  }

  openSpecificDialog(): void {
    if (this.currentStep === 1) {
      this.dialog.open(StepOneVehicleComponent).afterClosed().subscribe(result => {
        if (result) {
          this.currentStep = 2; // Move to the next step after closing the first dialog
          this.openSpecificDialog();
        }
      });
    } else if (this.currentStep === 2) {
      this.dialog.open(StepTwoDateComponent).afterClosed().subscribe(result => {
        if (result) {
          console.log('Form submitted with data:', result);
          // You can continue to the next step or submit the final form
        }
      });
    }
  }
}
