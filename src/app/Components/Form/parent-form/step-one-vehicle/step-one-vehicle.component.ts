import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
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
  selectedReportTypes: string[] = []; 
  showVehicleList = false;
  isButtonVisible = false;
  buttonValue = '+Add';
  reportForm: FormGroup;
  selectedBranch: string = 'All Vehicles';
  
  reportTypes = [
    { name: 'Fleet Wise Report', controlName: 'fleet' },
    { name: 'Vehicle Wise Report', controlName: 'vehicle' },
    { name: 'Trip Wise Report', controlName: 'trip' },
    { name: 'Driving Scorecard Report', controlName: 'driving' },
  ];

  branches = ['All Vehicles', 'Mumbai', 'Thane', 'Pune'];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private dataService: DataService,
    private dialogRef: MatDialogRef<StepOneVehicleComponent>,
    private matDialog: MatDialog
  ) {
    this.reportForm = this.fb.group({
      fleet: [true],
      vehicle: [false],
      trip: [false],
      driving: [false],
      email: ['', [Validators.email, Validators.required]],
      vehicleSearch: [''],
      branch: [this.selectedBranch]
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
    this.setupFormListeners();
  }

  loadVehicles(): void {
    this.dataService.getData().subscribe(data => {
      this.vehicles = data.vehicles;
      this.filteredVehicles = this.vehicles;
    });
  }

  setupFormListeners(): void {
    this.reportForm.valueChanges.subscribe(() => {
      this.updateSelectedReportTypes(); 
    });

    this.reportForm.get('vehicle')?.valueChanges.subscribe(value => {
      this.showVehicleList = value;
      if (!value) this.selectedVehicles = [];
    });

    this.reportForm.get('vehicleSearch')?.valueChanges.subscribe(() => {
      this.filteredVehicleList();
    });

    this.reportForm.get('branch')?.valueChanges.subscribe(() => {
      this.filteredVehicleList();
    });
  }

  updateSelectedReportTypes(): void {
    this.selectedReportTypes = this.reportTypes
      .filter(type => this.reportForm.get(type.controlName)?.value)
      .map(type => type.name);
  }

  isAnyReportTypeSelected(): boolean {
    return this.reportTypes.some(type => this.reportForm.get(type.controlName)?.value);
  }


  filteredVehicleList(): void {
    const vehicleSearch = this.reportForm.get('vehicleSearch')?.value?.trim().toLowerCase() || '';
    const branch = this.reportForm.get('branch')?.value;

    this.filteredVehicles = this.vehicles.filter(vehicle => {
        const matchesBranch = branch === 'All Vehicles' || vehicle.branch.toLowerCase() === branch.toLowerCase();
        const matchesSearch = vehicle.vin.toLowerCase().includes(vehicleSearch);
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

  onClose(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.modalService.stepTwoForm();
    this.dialogRef.close();
    this.reportForm.reset();
    this.selectedVehicles = []; 
    this.emails = []; 
  }

  onButtonClickVisible(): void {
    this.isButtonVisible = !this.isButtonVisible;
    this.buttonValue = this.isButtonVisible ? 'Cancel' : '+Add';
  }

  addEmail(): void {
    const emailControl = this.reportForm.get('email');
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (
      emailControl?.valid && 
      emailControl.value && 
      emailPattern.test(emailControl.value) && 
      !this.emails.includes(emailControl.value) && 
      this.emails.length < 5
    ) {
      this.emails.push(emailControl.value);
      emailControl.reset();
      emailControl.markAsUntouched();
    } else {
      if (emailControl && !emailPattern.test(emailControl.value)) {
        emailControl.setErrors({ invalidEmail: true });
      }
    }
  }
  

  removeEmail(index: number): void {
    if (index > -1 && index < this.emails.length) {
      this.emails.splice(index, 1);
    }
  }

  isNextButtonEnabled(): boolean {
    const isVehicleWiseReportSelected = this.reportForm.get('vehicle')?.value;
    const isAnyReportTypeSelected = this.selectedReportTypes.length > 0;
    const isAnyEmailEntered = this.emails.length > 0;
    const isAnyVehicleSelected = this.selectedVehicles.length > 0;
  
    return isAnyReportTypeSelected && 
           (isVehicleWiseReportSelected ? isAnyVehicleSelected : true) &&
           isAnyEmailEntered;
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
        reportTypes: this.selectedReportTypes 
      };

      const dialogRef = this.matDialog.open(StepTwoDateComponent, {
        data: {
          reports: this.selectedReportTypes, 
          vehicle: this.selectedVehicles, 
          email: this.emails 
        }      
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Dialog closed with result:', result);
        }
      });

      this.dialogRef.close();      
    }
  }
}
