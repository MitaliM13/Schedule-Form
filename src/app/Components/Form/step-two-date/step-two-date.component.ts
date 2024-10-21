import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';

@Component({
  selector: 'app-step-two-date',
  templateUrl: './step-two-date.component.html',
  styleUrls: ['./step-two-date.component.css']
}) 
export class StepTwoDateComponent {

  setDate: FormGroup

  constructor(private fb: FormBuilder){
    this.setDate = this.fb.group({
      weelky: [true],
      weekTwo: [false],
      monthly: [false],
      quaterly: [false],
      yearly: [false],
    })
  }
  
}
