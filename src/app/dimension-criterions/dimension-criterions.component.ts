import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Criterion} from "../models/criterion.interface";
import {DimensionService} from "../services/dimension.service";
import {CriterionDimension} from "../models/criterion-dimension.interface";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dimension-criterions',
  templateUrl: './dimension-criterions.component.html',
  styleUrls: ['./dimension-criterions.component.css']
})
export class DimensionCriterionsComponent implements OnInit {
  matrixCriterions: Criterion[] = [];
  dimensionCriterions: CriterionDimension[] = [];
  firstCriterion: Criterion;
  secondCriterion: Criterion;
  radioValue: string = "1";
  dimensionId: string;
  disableDimensionButton: boolean = true;

  weightCriterion = [];
  first: number = 0; //счётчик первого критерия при выводе
  second: number = 1;  //счётчик второго критерия при выводе

  constructor(private httpService: HttpService,
              private dimensionService: DimensionService,
              private route: Router) {
  }

  ngOnInit() {
    this.matrixCriterions = this.dimensionService.getCriterions();
    this.dimensionId = this.dimensionService.getDimension().id;
    console.log(this.matrixCriterions);

    this.firstCriterion = this.matrixCriterions[0];
    this.secondCriterion = this.matrixCriterions[1];

    this.weightCriterion.length = this.matrixCriterions.length;
    for (let i = 0; i < this.weightCriterion.length; i++) {
      this.weightCriterion[i] = new Array(this.matrixCriterions.length);
    }

    for (let i = 0; i < this.matrixCriterions.length; i++) {
      for (let j = 0; j < this.matrixCriterions.length; j++) {

        if (i == j) {  // единицы на главной диагонали
          this.weightCriterion[i][j] = 1;
        }
      }
    }
    console.log(this.weightCriterion);
  }

  logRadio(element: HTMLInputElement): void {
    this.radioValue = element.value;
  }

  nextCriterion() {
    let weight = parseFloat(this.radioValue);

    if (this.first == this.matrixCriterions.length - 1 && this.second == this.matrixCriterions.length - 2) {
      this.weightCriterion[this.first][this.second] = weight;
      alert("все критерии сравнены");
      console.log(this.weightCriterion);
    } else {
      this.weightCriterion[this.first][this.second] = weight;
      if (this.second >= this.matrixCriterions.length - 1) {
        this.first++;
        this.second = 0;
      } else {
        this.second++;
      }
      if (this.first === this.second) {
        this.second++;
      }
      this.firstCriterion = this.matrixCriterions[this.first];
      this.secondCriterion = this.matrixCriterions[this.second];
    }
    // console.log(this.weightCriterion);
    // console.log(this.first + " " + this.second);
  }

  lastCriterion() {
    if (this.first == 0 && this.second == 1) {
      console.log("Конец")
    } else {
      if (this.second == 0) {
        this.first--;
        this.second = this.matrixCriterions.length - 1;
      } else {
        this.second--;
        if (this.first == this.second) {
          this.second--;
        }
      }
      this.firstCriterion = this.matrixCriterions[this.first];
      this.secondCriterion = this.matrixCriterions[this.second];
    }
    // console.log(this.weightCriterion);
    // console.log(this.first + " " + this.second);
  }

  dimension() {
    for (let i in this.matrixCriterions) {
      let a = this.weightCriterion[i];
      this.dimensionCriterions[i] = new CriterionDimension("", this.dimensionId, this.matrixCriterions[i], "", a.toString());
    }

    this.httpService.addDimensionCriterions(this.dimensionId, this.dimensionCriterions)
      .subscribe(
        (data: CriterionDimension[]) => {
          this.dimensionService.setDimensionCriterions(data);
          this.route.navigateByUrl("/dimension-alternative");
        },
        error => {
          if(error.status == 409) alert("Матрица не согласована");
          console.log(error);
        }
      );
  }
}
