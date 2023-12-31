import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  newProgressPlan: any;

  view: boolean = false;
  backgroundCharge: string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.newProgressPlan = params['newProgressPlan'];
      if (this.newProgressPlan) {
        this.progressPlan = this.newProgressPlan;
      }
    })
  }

  ngOnInit(): void {
    this.getDataFromJson();
  }

  getDataFromJson() {
    this.view = true;
    this.backgroundCharge = 'backgroundCharge';
    this.dataService.getData().subscribe({
      next: res => {
        setTimeout(() => {
          this.view = false;
          this.backgroundCharge = '';
          this.datos = res[0];
          if (this.newProgressPlan) {
            this.progressPlan = this.newProgressPlan;
            this.router.navigate(['/main/dashboard', this.newProgressPlan]);
            this.datos.trainingPlan.courses[0].courseEnable = !this.datos.trainingPlan.courses[0].courseEnable;
            this.datos.trainingPlan.courses[0].coursesProgress = '100%';
            this.datos.trainingPlan.courses[1].courseEnable = !this.datos.trainingPlan.courses[1].courseEnable;
            this.datos.trainingPlan.courses[0].technicalProfile.totalSkill++;
            this.datos.trainingPlan.courses[0].technicalProfile.initTotalCourse--;
          } else {
            this.progressPlan = this.datos.trainingPlan.planProgress;
            this.router.navigate(['/main/dashboard']);
          }
        }, 1000);
      }
    })
  }

  goCouse() {
    this.router.navigate(['/main/recommender']);
  }

}
