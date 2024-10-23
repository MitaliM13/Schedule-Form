import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-two-date',
  templateUrl: './step-two-date.component.html',
  styleUrls: ['./step-two-date.component.css']
})
export class StepTwoDateComponent implements OnInit {

  scheduleForm: FormGroup;
  isEditMode: boolean = false;

  minDate: Date;
  today: Date = new Date();
  timeIntervals = ['Weekly', 'Every 2 weeks', 'Monthly', 'Quarterly', 'Yearly'];
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  monthDays = Array.from({ length: 28 }, (_, i) => i + 1);
  quarterlyOptions = ['Last day of the completed quarter', 'First day of the next quarter', 'Custom'];
  yearlyOptions = ['Last day of the year', 'First day of the next year', 'Custom'];
  timeFormat: string = 'AM';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StepTwoDateComponent>
  ) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    this.scheduleForm = this.fb.group({
      reportTypes: ['', Validators.required],
      vehicles: ['', Validators.required],
      mailedTo: ['', [Validators.required, Validators.email]],
      setTime: ['09:30', Validators.required],
      timeFormat: ['AM', Validators.required],
      skipWeekends: [true],
      timeInterval: ['Weekly', Validators.required],
      weeklyDay: ['Monday'],
      monthlyDay: [1],
      quarterlyOption: ['Last day of the completed quarter'],
      yearlyOption: ['Last day of the year'],
      customDate: ['']
    });
  }

  ngOnInit(): void {
    const stepOneData = localStorage.getItem('stepOneData');
    if (stepOneData) {
      const data = JSON.parse(stepOneData);

      // Populate the scheduleForm with the retrieved data
      this.scheduleForm.patchValue({
        vehicles: data.selectedVehicles.join(', '), // Convert array to a string for display
        mailedTo: data.email.join(', '),
        reportTypes: data.reportTypes.join(', ') // Display selected report types
      });

      localStorage.removeItem('stepOneData'); // Clear local storage after use
    }
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode; // Toggle the edit mode

    if (!this.isEditMode) {
      // Optionally handle form submission or validation
      if (this.scheduleForm.valid) {
        this.dialogRef.close(this.scheduleForm.value);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDone(): void {
    if (this.scheduleForm.valid) {
      this.dialogRef.close(this.scheduleForm.value);
    }
  }

  incrementTime(): void {
    let currentTime = this.scheduleForm.get('setTime')?.value;
    let timeFormat = this.scheduleForm.get('timeFormat')?.value;

    let [hours, minutes] = currentTime.split(':').map(Number);
    if (timeFormat === 'PM' && hours < 12) {
      hours += 12;
    } else if (timeFormat === 'AM' && hours === 12) {
      hours = 0;
    }

    let newDate = new Date(2023, 0, 1, hours, minutes);
    newDate.setMinutes(newDate.getMinutes() + 1);

    this.updateTime(newDate);
  }

  decrementTime(): void {
    let currentTime = this.scheduleForm.get('setTime')?.value;
    let timeFormat = this.scheduleForm.get('timeFormat')?.value;

    let [hours, minutes] = currentTime.split(':').map(Number);
    if (timeFormat === 'PM' && hours < 12) {
      hours += 12;
    } else if (timeFormat === 'AM' && hours === 12) {
      hours = 0;
    }

    let newDate = new Date(2023, 0, 1, hours, minutes);
    newDate.setMinutes(newDate.getMinutes() - 1);

    this.updateTime(newDate);
  }

  updateTime(newDate: Date): void {
    let newHours = newDate.getHours();
    let newMinutes = newDate.getMinutes();
    let newTimeFormat = 'AM';

    if (newHours >= 12) {
      newTimeFormat = 'PM';
      if (newHours > 12) {
        newHours -= 12;
      }
    } else if (newHours === 0) {
      newHours = 12; 
    }

    this.scheduleForm.patchValue({
      setTime: `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`,
      timeFormat: newTimeFormat
    });
  }
}
