import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartData, ChartDataset, ChartEvent, ChartType } from 'chart.js';
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
  isLast = false;
  showGraph = false;
  correctAnswers: any[] = [];
  countCorrectAnswers: number = 0;
  percentajeAnswer: number = 0;

  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDataFromJson();
    this.myForm = this.formBuilder.group({
      answer: ''
    });
  }

  checkLast(event: any) {
    console.log('Event del hijo: ', event);
    this.isLast = event;
  }

  showValue() {
    console.log(this.myForm?.getRawValue());
    this.answers.push(this.myForm?.getRawValue().answer);
  }

  getDataFromJson() {
    this.dataService.getData().subscribe({
      next: res => {
        this.data = res[0].trainingPlan.courses[0].sections[0].test;
        console.log(this.data);
        if (this.data.length > 0) {
          this.data.forEach((item: { answerId: any; }) => {
            this.correctAnswers.push(item.answerId);
          });
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }
  goBack() {
    const value = '30';
    this.router.navigate(['main/dashboard'], { queryParams: { newProgressPlan: value }});
  }

  sendResults() {
    console.log('respuestas ingresadas: ', this.answers);
    console.log('respuestas correctas: ', this.correctAnswers);
    this.showGraph = true;
    for (let i = 0; i < this.correctAnswers.length; i++) {
      if (this.correctAnswers[i] === this.answers[i]) {
        this.countCorrectAnswers++;
        console.log('valor dentro del foreach: ', this.countCorrectAnswers);
        break;
      }
    }

    if (this.countCorrectAnswers === this.correctAnswers.length) {
      this.percentajeAnswer = 100;
    } else {
      this.percentajeAnswer = (this.countCorrectAnswers * 100) / this.correctAnswers.length;
    }
    console.log('porcentaje de exito: ', this.percentajeAnswer)
  }

  public doughnutChartLabels: string[] = ['Porcentaje de exito'];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [66.66, 100 - 66.66],
        backgroundColor: ['#4ACC15', '#EE111B'],
        hoverBackgroundColor: ['#4ACC15', '#EE111B']
      },
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  public chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      center: {
        text: `${this.percentajeAnswer}%`, // Muestra el porcentaje en el centro
        color: '#36A2EB', // Color del texto
        fontStyle: 'Arial', // Fuente del texto
        sidePadding: 15 // Espaciado del texto
      }
    }
  };

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
