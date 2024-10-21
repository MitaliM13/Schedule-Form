import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { FormBuilder,FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css']
})
export class ParentFormComponent  implements OnInit {

  data: any[] = [];
  errorMessage: string = '';

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataService.getData().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
      },
      (error) => {
        console.error("Error Fetching data", error);
        this.errorMessage = "Failed to load data. Please try again later.";
      }
    );
  }

}
