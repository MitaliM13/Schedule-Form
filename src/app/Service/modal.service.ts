import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public step = new BehaviorSubject<number>(1)
  currentStep$ = this.step.asObservable()

  stepTwoFortm(){
    const formTwo = this.step.value + 1
    this.step.next(formTwo)
  }

  reset(){
    this.step.next(1)
  }
}
