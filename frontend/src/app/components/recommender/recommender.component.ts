import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  public doughnutChartLabels: string[] = [
    'Download Sales'
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] }
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
