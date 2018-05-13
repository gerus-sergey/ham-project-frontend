import {Component, OnInit} from '@angular/core';
import {DimensionService} from "../services/dimension.service";
import {CriterionDimension} from "../models/criterion-dimension.interface";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";
import {Alternative} from "../models/alternative.interface";
import {AlternativeDimension} from "../models/alternative-dimension.interface";
import {Criterion} from "../models/criterion.interface";

@Component({
  selector: 'app-dimension-alternatives',
  templateUrl: './dimension-alternatives.component.html',
  styleUrls: ['./dimension-alternatives.component.css']
})
export class DimensionAlternativesComponent implements OnInit {

  matrixAlternatives: Alternative[] = [];
  dimensionAlternatives: AlternativeDimension[] = [];
  dimensionCriterions: CriterionDimension[] = [];
  alternative: Alternative;
  criterion: Criterion;
  radioValue: string = "1";
  dimensionId: string;
  disableDimensionButton: boolean = true;

  weightAlterntives = [];
  first: number = 0;
  second: number = 0;

  constructor(private httpService: HttpService,
              private dimensionService: DimensionService,
              private route: Router) {
  }

  ngOnInit() {
    this.matrixAlternatives = this.dimensionService.getAlternatives();
    this.dimensionCriterions = this.dimensionService.getDimensionCriterions();
    this.dimensionId = this.dimensionService.getDimension().id;


    console.log(this.matrixAlternatives);
    console.log(this.dimensionCriterions.length);

    this.alternative = this.matrixAlternatives[0];
    this.criterion = this.dimensionCriterions[0].criterion;

    this.weightAlterntives.length = this.matrixAlternatives.length;

    for (let i = 0; i < this.weightAlterntives.length; i++) {
      this.weightAlterntives[i] = new Array(this.dimensionCriterions.length);
    }


    console.log(this.weightAlterntives);
  }

  logRadio(element: HTMLInputElement): void {
    this.radioValue = element.value;
  }

  nextAlternative() {
    let weight = parseFloat(this.radioValue);

    if (this.first == this.matrixAlternatives.length - 1 && this.second == this.dimensionCriterions.length - 1) {
      this.weightAlterntives[this.first][this.second] = weight;
      alert("Все альтернативы оценены !");
      console.log(this.weightAlterntives);
    } else {
      this.weightAlterntives[this.first][this.second] = weight;
      if (this.second >= this.dimensionCriterions.length - 1) {
        this.first++;
        this.second = 0;
      } else {
        this.second++;
      }
      this.alternative = this.matrixAlternatives[this.first];
      this.criterion = this.dimensionCriterions[this.second].criterion;
    }
  }

  lastAlternative() {
    if (this.first == 0 && this.second == 0) {
      console.log("Конец")
    } else {
      if (this.second == 0) {
        this.first--;
        this.second = this.dimensionCriterions.length - 1;
      } else {
        this.second--;
      }
      this.alternative = this.matrixAlternatives[this.first];
      this.criterion = this.dimensionCriterions[this.second].criterion;
    }
  }

  dimension() {
    for (let i in this.matrixAlternatives) {
      let a = this.weightAlterntives[i];
      this.dimensionAlternatives.push(new AlternativeDimension(
        "", this.dimensionId, this.matrixAlternatives[i], "", a.toString()));
    }

    console.log(this.dimensionAlternatives);

    this.httpService.addDimensionAlternatives(this.dimensionId, this.dimensionAlternatives)
      .subscribe(
        (data: AlternativeDimension[]) => {
          console.log(data)
          this.route.navigateByUrl("/dimension-result/" + this.dimensionId);
        },
        error => {
          console.log(error);
        }
      );
  }
}
