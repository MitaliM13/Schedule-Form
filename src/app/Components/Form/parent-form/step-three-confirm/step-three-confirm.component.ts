import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-three-confirm',
  templateUrl: './step-three-confirm.component.html',
  styleUrls: ['./step-three-confirm.component.css']
})
export class StepThreeConfirmComponent implements OnInit {
  stepOneData: any;
  stepTwoData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve data from local storage or service
    this.stepOneData = JSON.parse(localStorage.getItem('stepOneData') || '{}');
    this.stepTwoData = JSON.parse(localStorage.getItem('stepTwoData') || '{}');
   
  }

  onConfirm(): void {
    // Logic to finalize the process, e.g., send data to the server
    localStorage.removeItem('stepOneData');
    localStorage.removeItem('stepTwoData');
    this.router.navigate(['/success']); // Redirect to a success page or summary
  }
}
