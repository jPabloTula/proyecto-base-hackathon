import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.scss']
})
export class RecommenderComponent implements OnInit {
  steps: any[] = [
    {
      step: 1,
      pregunta: 'Pregunta 1',
    },
    {
      step: 2,
      pregunta: 'Pregunta 2',
    },
    {
      step: 3,
      pregunta: 'Pregunta 3',
    },
    {
      step: 4,
      pregunta: 'Pregunta 4',
    },
    {
      step: 5,
      pregunta: 'Pregunta 5',
    }
  ]
  respuesta: string = '';
  respuestaPractica: string = '';
  data: any;
  selectedOption: string = '';
  index: number = 0;
  myForm: FormGroup | undefined;
  answers: any[] = [];


  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDataFromJson();
    this.myForm = this.formBuilder.group({
      answer:''
    });
  }

  checkLast(): boolean {
    if (this.index === this.data.length) {
      return true;
    }
    return false;
  }

  showValue() {
    console.log(this.myForm?.getRawValue());
    this.answers.push(this.myForm?.getRawValue());
  }

  getDataFromJson() {
    this.dataService.getData().subscribe({
      next: res => {
        this.data = res[0].courses[0].sections[0].test;
        this.index = this.data.length;
      }
    })
  }
  goBack() {
    this.router.navigate(['home']);
  }

  public doughnutChartLabels: string[] = [
    'Porcentaje de exito'
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 0, 100] }
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

}
