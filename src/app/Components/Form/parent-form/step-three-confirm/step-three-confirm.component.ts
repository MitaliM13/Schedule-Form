import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-step-three-confirm',
  templateUrl: './step-three-confirm.component.html',
  styleUrls: ['./step-three-confirm.component.css']
})
export class StepThreeConfirmComponent implements OnInit {
  stepOneData: any = {};  
  stepTwoData: any = {}; 

  constructor(public dialogRef: MatDialogRef<StepThreeConfirmComponent>) {}

  ngOnInit(): void {
    this.stepOneData = JSON.parse(localStorage.getItem('stepOneData') || '{}');
    this.stepTwoData = JSON.parse(localStorage.getItem('stepTwoData') || '{}');
  }

  onConfirm(): void {

    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}
