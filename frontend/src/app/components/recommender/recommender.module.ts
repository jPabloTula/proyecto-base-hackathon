import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommenderComponent } from './recommender.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component';

const routes: Routes = [
  {
    path: '',
    component: RecommenderComponent
  }
]
@NgModule({
  declarations: [
    RecommenderComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CdkStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class RecommenderModule { }
