import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-step-one-vehicle',
  templateUrl: './step-one-vehicle.component.html',
  styleUrls: ['./step-one-vehicle.component.css']
})
export class StepOneVehicleComponent implements OnInit {
  emails: string[] = [];
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  selectedBranch: string = 'all';
  showVehicleList = false;
  isButtonVisible: boolean = false;
  buttonValue: string = '+Add';
  vehicleReport: FormGroup;
  branches: string[] = ['Branch 1', 'Branch 2', 'Branch 3'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: DataService,
    private dialogRef: MatDialogRef<StepOneVehicleComponent>
  ) {
    this.vehicleReport = this.fb.group({
      fleet: [true],
      vehicle: [false],
      trip: [false],
      driving: [false],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.vehicles = data.vehicles;
      this.filteredVehicles = this.vehicles;
    });

    this.vehicleReport.get('vehicle')?.valueChanges.subscribe(value => {
      this.showVehicleList = value;
    });
  }

  filterVehicles(): void {
    this.filteredVehicles = this.selectedBranch === 'all' ? this.vehicles : 
      this.vehicles.filter(vehicle => vehicle.branch === this.selectedBranch);
    this.showVehicleList = this.filteredVehicles.length > 0;
  }

  onButtonClickVisible(): void {
    this.isButtonVisible = !this.isButtonVisible;
    this.buttonValue = this.isButtonVisible ? 'Cancel' : '+Add';
  }

  addEmail(): void {
    const email = this.vehicleReport.get('email')?.value;
    if (email && this.emails.length < 5) {
      this.emails.push(email);
      this.vehicleReport.get('email')?.reset();
      this.isButtonVisible = false;
      this.buttonValue = '+Add';
    }
  }

  removeEmail(index: number): void {
    this.emails.splice(index, 1);
  }

  isNextButtonEnabled(): boolean {
    const formValues = this.vehicleReport.value;
    const hasChecked = formValues.vehicle || formValues.trip || formValues.driving;
    const hasEmail = this.emails.length > 0;
    return hasChecked && hasEmail;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onNext(): void {
    if (this.vehicleReport.valid) {
      this.dialogRef.close(this.vehicleReport.value);
    }
  }
}
