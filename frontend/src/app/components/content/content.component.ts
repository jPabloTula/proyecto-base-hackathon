import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-Content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  nameCourses:any;
  content:any;
  viewBack:any;
  constructor(private dataService: DataService) {

   }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      {
        next: (response) => {
          this.nameCourses=response[0].courses[0].sections[0].name;
          this.content = response[0].courses[0].sections[0].test[0].content;
          this.viewBack= response[0].courses[0].sections[0].id != 1;
          console.log(response)

        }
      }
    )
  }

}
