import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {AlternativesRating} from "../models/alternatives-rating.interface";
import {CriterionsRating} from "../models/criterions-rating.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dimension-result',
  templateUrl: './dimension-result.component.html',
  styleUrls: ['./dimension-result.component.css'],
  providers: [HttpService]
})
export class DimensionResultComponent implements OnInit {
  public ratingCriterions: CriterionsRating[] = [];
  public ratingAlternatives: AlternativesRating[] = [];

  constructor(private httpService: HttpService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.httpService.getRatingCriterionsByDimension(this.route.snapshot.params["id"])
      .subscribe(
        (data: CriterionsRating) => {
          for (let index in data) {
            this.ratingCriterions.push(data[index])
          }
          console.log(this.ratingCriterions)
        },
        error => {
          console.log(error);
        }
      );

    this.httpService.getRatingAlternativesByDimension(this.route.snapshot.params["id"])
      .subscribe(
        (data: AlternativesRating) => {
          for (let index in data) {
            this.ratingAlternatives.push(data[index])
          }
          console.log(this.ratingAlternatives)
        },
        error => {
          console.log(error);
        }
      )
  }

}
