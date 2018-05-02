import { Component, OnInit } from '@angular/core';
import {Dimension} from "../models/dimension.interface";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-dimension-history',
  templateUrl: './dimension-history.component.html',
  styleUrls: ['./dimension-history.component.css'],
  providers: [HttpService]
})
export class DimensionHistoryComponent implements OnInit {

  public dimensions: Dimension[] = [];
  public id: String;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.httpService.getDimensions(this.id)
      .subscribe(
        (data: Dimension) => {
          for (let index in data) {
            this.dimensions.push(data[index])
          }
          console.log(this.dimensions)
        },
        error => {
          console.log(error);
        }
      );
  }

}
