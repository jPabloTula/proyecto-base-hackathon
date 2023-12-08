import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommenderComponent } from './recommender.component';



@NgModule({
  declarations: [RecommenderComponent],
  imports: [
    CommonModule
  ],
  exports: [RecommenderComponent]
})
export class RecommenderModule { }
