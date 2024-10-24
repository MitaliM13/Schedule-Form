import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/Service/modal.service';
import { StepOneVehicleComponent } from './step-one-vehicle/step-one-vehicle.component';
import { StepTwoDateComponent } from './step-two-date/step-two-date.component';
import { StepThreeConfirmComponent } from './step-three-confirm/step-three-confirm.component';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css']
})
export class ParentFormComponent implements OnInit {
  data: any[] = [];
  errorMessage: string = '';
  currentStep: number = 1;

  constructor(private dataService: DataService, private dialog: MatDialog, private modal: ModalService) {}

  ngOnInit(): void {
    this.fetchData();

    this.modal.currentStep$.subscribe(step => {
      this.currentStep = step
      this.openDialog(step)
    })
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

  openDialog(step: number) {
    if(step === 1){
      this.dialog.open(StepOneVehicleComponent)
    } else if (step === 2){
      this.dialog.open(StepTwoDateComponent)
    } else if (step === 3){
      this.dialog.open(StepThreeConfirmComponent)
    }
  }
}
