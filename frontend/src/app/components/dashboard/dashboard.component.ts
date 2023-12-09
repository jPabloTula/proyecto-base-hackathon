import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  datos: any;
  progressPlan: any;
  progressCourse: any;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataFromJson();
  }

  getDataFromJson() {
    this.dataService.getData().subscribe({
      next: res => {
        console.log('Datos: ', res);
        this.datos = res[0];
        this.progressPlan = this.datos.trainingPlan.planProgress;
      }
    })
  }

  goCouse(){
    this.router.navigate(['/main/recommender']);
  }

}
