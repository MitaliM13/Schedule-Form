import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/Service/modal.service';

@Component({
  selector: 'app-step-two-date',
  templateUrl: './step-two-date.component.html',
  styleUrls: ['./step-two-date.component.css']
})
export class StepTwoDateComponent implements OnInit {
  scheduleForm: FormGroup;
  vehicles: string = '';
  mailedTo: string = '';
  reportTypes: string = '';
  minDate: Date;
  today: Date = new Date();
  timeIntervals = ['Weekly', 'Every 2 weeks', 'Monthly', 'Quarterly', 'Yearly'];
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  monthDays = Array.from({ length: 28 }, (_, i) => i + 1);
  quarterlyOptions = ['Last day of the completed quarter', 'First day of the next quarter', 'Custom'];
  yearlyOptions = ['Last day of the year', 'First day of the next year', 'Custom'];
  timeFormat: string = 'AM';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StepTwoDateComponent>,
    private modal: ModalService,
  ) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    this.scheduleForm = this.fb.group({
      setTime: ['09:30', [Validators.required, this.timeFormatValidator]],
      timeFormat: ['AM', Validators.required],
      skipWeekends: [true],
      timeInterval: ['Weekly', Validators.required],
      weeklyDay: ['Monday', Validators.required],
      monthlyDay: [1, [Validators.required, Validators.min(1), Validators.max(28)]],
      quarterlyOption: ['Last day of the completed quarter', Validators.required],
      yearlyOption: ['Last day of the year', Validators.required],
      customDate: ['']
  });
  }

  ngOnInit(): void {
    this.loadStepOneData();
  }

  loadStepOneData(): void {
    const stepOneData = localStorage.getItem('stepOneData');
    if (stepOneData) {
      try {
        const data = JSON.parse(stepOneData);
        this.vehicles = data.selectedVehicles?.length ? data.selectedVehicles.join(', ') : '';
        this.mailedTo = data.email?.length ? data.email.join(', ') : '';
        this.reportTypes = data.reportTypes?.length ? data.reportTypes.join(', ') : '';
        localStorage.removeItem('stepOneData');
      } catch (error) {
        console.error("Error parsing stepOneData", error);
      }
    }
  }

  timeFormatValidator(control: AbstractControl) {
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
    return timePattern.test(control.value) ? null : { invalidTime: true };
}


  adjustForWeekends(day: string): string {
    if (this.scheduleForm.get('skipWeekends')?.value) {
      return day === 'Saturday' || day === 'Sunday' ? 'Monday' : day;
    }
    return day;
  }

  onNext(): void {
    if (this.scheduleForm.valid) {
      const weeklyDay = this.adjustForWeekends(this.scheduleForm.get('weeklyDay')?.value);
      const form = {
        setTime: this.scheduleForm.get('setTime')?.value,
        timeFormat: this.scheduleForm.get('timeFormat')?.value,
        timeInterval: this.scheduleForm.get('timeInterval')?.value,
        weeklyDay,
        monthlyDay: this.scheduleForm.get('monthlyDay')?.value,
        quarterlyOption: this.scheduleForm.get('quarterlyOption')?.value,
        yearlyOption: this.scheduleForm.get('yearlyOption')?.value,
        customDate: this.scheduleForm.get('customDate')?.value,
        vehicles: this.vehicles,
        mailedTo: this.mailedTo,
        reportTypes: this.reportTypes
      };

      localStorage.setItem('stepTwoData', JSON.stringify(form));
      this.modal.stepTwoFortm();
      this.dialogRef.close();
    }
  }

  updateTime(newDate: Date): void {
    let newHours = newDate.getHours();
    let newMinutes = newDate.getMinutes();
    let newTimeFormat = 'AM';

    if (newHours >= 12) {
      newTimeFormat = 'PM';
      if (newHours > 12) newHours -= 12;
    } else if (newHours === 0) {
      newHours = 12;
    }

    this.scheduleForm.patchValue({
      setTime: `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`,
      timeFormat: newTimeFormat
    });
  }

  incrementTime(): void {
    this.adjustTime(1);
  }

  decrementTime(): void {
    this.adjustTime(-1);
  }

  adjustTime(direction: number): void {
    let currentTime = this.scheduleForm.get('setTime')?.value;
    let timeFormat = this.scheduleForm.get('timeFormat')?.value;
    let [hours, minutes] = currentTime.split(':').map(Number);

    if (timeFormat === 'PM' && hours < 12) {
      hours += 12;
    } else if (timeFormat === 'AM' && hours === 12) {
      hours = 0;
    }

    let newDate = new Date(2023, 0, 1, hours, minutes);
    newDate.setMinutes(newDate.getMinutes() + direction);

    this.updateTime(newDate);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
