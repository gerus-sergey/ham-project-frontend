import { Component, OnInit } from '@angular/core';
import {Dimension} from "../models/dimension.interface";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dimension-history',
  templateUrl: './dimension-history.component.html',
  styleUrls: ['./dimension-history.component.css'],
  providers: [HttpService]
})
export class DimensionHistoryComponent implements OnInit {
  public dimensions: Dimension[] = [];
  private id: number;

  constructor(private httpService: HttpService,
              private route: Router) {
  }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem('id'));
    if(this.id == null || isNaN(this.id)) this.route.navigateByUrl("/");
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

  deleteDimension(dimensionId: string, index: number){
    this.httpService.deleteDimension(dimensionId)
      .subscribe(
        (data) => {
          console.log(data);
          this.dimensions.splice(index, 1);
        },
        error => {
          console.log(error);
        }
      );
  }

}
