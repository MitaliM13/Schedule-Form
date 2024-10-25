import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-step-three-confirm',
  templateUrl: './step-three-confirm.component.html',
  styleUrls: ['./step-three-confirm.component.css']
})
export class StepThreeConfirmComponent implements OnInit {
  stepTwoData: any = {};
  stepOneData: any = {};
  finalData: any = {};

  constructor(public dialog: MatDialogRef<StepThreeConfirmComponent>) {}

  ngOnInit(): void {
    this.loadFinalData();
  }

  loadFinalData(): void {
    const stepOneData = localStorage.getItem('stepOneData');
    const stepTwoData = localStorage.getItem('stepTwoData');

    if (stepOneData) {
      try {
        this.stepOneData = JSON.parse(stepOneData);
      } catch (error) {
        console.error("Error parsing stepOneData:", error);
      }
    }

    if (stepTwoData) {
      try {
        this.stepTwoData = JSON.parse(stepTwoData);
      } catch (error) {
        console.error("Error parsing stepTwoData:", error);
      }
    }

    this.finalData = {
      stepOne: this.stepOneData,
      stepTwo: this.stepTwoData,
    };
  }

  onConfirm(): void {
    this.dialog.close('confirmed'); 
  }
}
