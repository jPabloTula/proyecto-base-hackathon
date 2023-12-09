import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit  {
  @Output() isLast: EventEmitter<any> = new EventEmitter<any>();
  @Input() size!: number;
  currentIndex: number = 0;

  ngOnInit(): void {
  }
  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }

  nextStep(index: number): void {
    this.next();
    if (index+1 < this.size) {
      console.log('index', index);
    } else {
      this.isLast.emit(true);
    }
  }

}
