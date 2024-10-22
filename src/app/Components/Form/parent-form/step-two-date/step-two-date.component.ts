import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-step-two-date',
  templateUrl: './step-two-date.component.html',
  styleUrls: ['./step-two-date.component.css']
}) 
export class StepTwoDateComponent implements OnInit{

  scheduleForm: FormGroup;
  today: Date = new Date();
  timeIntervals = ['Weekly', 'Every 2 weeks', 'Monthly', 'Quarterly', 'Yearly'];
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  monthDays = Array.from({ length: 28 }, (_, i) => i + 1);
  quarterlyOptions = ['Last day of the completed quarter', 'First day of the next quarter', 'Custom'];
  yearlyOptions = ['Last day of the year', 'First day of the next year', 'Custom'];
  minDate: Date;
  
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

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDone(): void {
    if (this.scheduleForm.valid) {
      this.dialogRef.close(this.scheduleForm.value);
    }
  }

  incrementTime(): void {
    const currentTime = this.scheduleForm.get('setTime')?.value;
    const [hours, minutes] = currentTime.split(':').map(Number);
    const newDate = new Date(2023, 0, 1, hours, minutes);
    newDate.setMinutes(newDate.getMinutes() + 1);
    this.scheduleForm.patchValue({
      setTime: `${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`
    });
  }

  decrementTime(): void {
    const currentTime = this.scheduleForm.get('setTime')?.value;
    const [hours, minutes] = currentTime.split(':').map(Number);
    const newDate = new Date(2023, 0, 1, hours, minutes);
    newDate.setMinutes(newDate.getMinutes() - 1);
    this.scheduleForm.patchValue({
      setTime: `${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`
    });
  }
}
