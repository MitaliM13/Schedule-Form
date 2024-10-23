import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
import { ModalService } from 'src/app/Service/modal.service';
import { StepTwoDateComponent } from '../step-two-date/step-two-date.component';

@Component({
  selector: 'app-step-one-vehicle',
  templateUrl: './step-one-vehicle.component.html',
  styleUrls: ['./step-one-vehicle.component.css']
})
export class StepOneVehicleComponent implements OnInit {
  emails: string[] = [];
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  selectedVehicles: string[] = [];
  selectedReportTypes: string[] = []; // Store selected report types

  showVehicleList = false;
  isButtonVisible = false;
  buttonValue = '+Add';
  reportForm: FormGroup;
  selectedBranch: string = 'All Vehicles';

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private dataService: DataService,
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<StepOneVehicleComponent>
  ) {
    this.reportForm = this.fb.group({
      fleet: [false],
      vehicle: [false],
      trip: [false],
      driving: [false],
      email: [''],
      vehicleSearch: [''],
      branch: [this.selectedBranch]
    });
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.vehicles = data.vehicles;
      this.filteredVehicles = this.vehicles;
    });

    this.reportForm.valueChanges.subscribe(() => {
      this.updateSelectedReportTypes(); // Update report types on form changes
    });

    this.reportForm.get('vehicle')?.valueChanges.subscribe(value => {
      this.showVehicleList = value;
    });

    this.reportForm.get('vehicleSearch')?.valueChanges.subscribe(value => {
      this.filteredVehicleList();
    });

    this.reportForm.get('branch')?.valueChanges.subscribe(value => {
      this.filteredVehicleList();
    });
  }

  // Function to update selected report types based on the form values
  updateSelectedReportTypes(): void {
    this.selectedReportTypes = [];

    if (this.reportForm.get('fleet')?.value) {
      this.selectedReportTypes.push('Fleet');
    }
    if (this.reportForm.get('vehicle')?.value) {
      this.selectedReportTypes.push('Vehicle');
    }
    if (this.reportForm.get('trip')?.value) {
      this.selectedReportTypes.push('Trip');
    }
    if (this.reportForm.get('driving')?.value) {
      this.selectedReportTypes.push('Driving');
    }
  }

  filteredVehicleList(): void {
    const vehicleSearch = this.reportForm.get('vehicleSearch')?.value.toLowerCase();
    const branch = this.reportForm.get('branch')?.value;

    this.filteredVehicles = this.vehicles.filter(vehicle => {
      const matchesBranch = branch === 'All Vehicles' || vehicle.branch.toLowerCase() === branch.toLowerCase();
      const matchesSearch = !vehicleSearch || vehicle.branch.toLowerCase().includes(vehicleSearch);
      return matchesBranch && matchesSearch;
    });
  }

  onVehicleSelect(vehicle: any): void {
    vehicle.selected = !vehicle.selected;
    if (vehicle.selected) {
      this.selectedVehicles.push(vehicle.vin);
    } else {
      this.selectedVehicles = this.selectedVehicles.filter(vin => vin !== vehicle.vin);
    }
  }

  onCancel(): void {
    this.modalService.stepTwoFortm();
    this.dialogRef.close();
    this.reportForm.reset();
  }

  onButtonClickVisible(): void {
    this.isButtonVisible = !this.isButtonVisible;
    this.buttonValue = this.isButtonVisible ? 'Cancel' : '+Add';
  }

  addEmail(): void {
    const emailControl = this.reportForm.get('email');
    if (emailControl?.valid && this.emails.length < 5) {
      this.emails.push(emailControl.value);
      emailControl.reset();
      emailControl.markAsUntouched();
    }
  }

  removeEmail(index: number): void {
    if (index > -1 && index < this.emails.length) {
      this.emails.splice(index, 1);
    }
  }

  isNextButtonEnabled(): boolean {
    return this.selectedReportTypes.length > 0 && this.selectedVehicles.length > 0 && this.emails.length > 0;
  }

  onNext(): void {
    if (this.isNextButtonEnabled()) {
      const formData = {
        fleet: this.reportForm.get('fleet')?.value,
        vehicle: this.reportForm.get('vehicle')?.value,
        trip: this.reportForm.get('trip')?.value,
        driving: this.reportForm.get('driving')?.value,
        email: this.emails,
        vehicleSearch: this.reportForm.get('vehicleSearch')?.value,
        branch: this.reportForm.get('branch')?.value,
        selectedVehicles: this.selectedVehicles,
        reportTypes: this.selectedReportTypes // Include the selected report types here
      };

      localStorage.setItem('stepOneData', JSON.stringify(formData));
      this.modalService.stepTwoFortm();
      this.dialogRef.close();
    }
  }
}
