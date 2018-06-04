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
  indexOne = [];
  indexTwo = [];

  flagButtonsCriterions: boolean = false;
  flagRadioCriterions: boolean = false;
  flagRangeCriterions: boolean = false;

  constructor(private httpService: HttpService,
              private dimensionService: DimensionService,
              private route: Router) {
  }

  ngOnInit() {
    if(this.dimensionService.evaluateCriterionsMethod == "buttons") this.flagButtonsCriterions = true;
    if(this.dimensionService.evaluateCriterionsMethod == "radio") this.flagRadioCriterions = true;
    if(this.dimensionService.evaluateCriterionsMethod == "range") this.flagRangeCriterions = true;
    this.matrixCriterions = this.dimensionService.getCriterions();

    // this.matrixCriterions.push(new Criterion("1", "name1", "qwe"));
    // this.matrixCriterions.push(new Criterion("2", "name2", "qwe"));
    // this.matrixCriterions.push(new Criterion("3", "name3", "qwe"));
    // this.matrixCriterions.push(new Criterion("4", "name4", "qwe"));

    this.dimensionId = this.dimensionService.getDimension().id;
    // this.dimensionId = "12";
    console.log(this.matrixCriterions);

    this.firstCriterion = this.matrixCriterions[0];
    this.secondCriterion = this.matrixCriterions[1];

    this.weightCriterion.length = this.matrixCriterions.length;
    for (let i = 0; i < this.weightCriterion.length; i++) {
      this.weightCriterion[i] = new Array(this.matrixCriterions.length);
    }

    for (let i = 0; i < this.matrixCriterions.length; i++) {
      for (let j = 0; j < this.matrixCriterions.length; j++) {
        if (i != j) {
          this.indexOne.push(i);
          this.indexTwo.push(j);
        }
        this.weightCriterion[i][j] = 1;
      }
    }
    console.log(this.indexOne);
    console.log(this.indexTwo);
  }

  setRadioFromButtonsView(element: HTMLInputElement){
    this.radioValue = element.value;
  }

  logRadio(element: HTMLInputElement, indexOne: number, indexTwo: number): void {
    this.weightCriterion[indexOne][this.indexTwo[indexTwo]] = parseFloat(element.value);
    console.log(this.weightCriterion);
  }

  setRange(value:any, indexOne: number, indexTwo: number){
    let weight;
    console.log(value);
    switch (parseInt(value)){
      case -8:
        weight = 0.11;
        break;
      case -6:
        weight = 0.33;
        break;
      case -4:
        weight = 0.55;
        break;
      case -2:
        weight = 0.77;
        break;
      case 2:
        weight = 1.285;
        break;
      case 4:
        weight = 1.8;
        break;
      case 6:
        weight = 3;
        break;
      case 8:
        weight = 9;
        break;
      default:
        weight = 1;
        break;
    }
      this.weightCriterion[indexOne][this.indexTwo[indexTwo]] = parseFloat(weight);
      console.log(this.weightCriterion);
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
    console.log(this.weightCriterion);
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
          if (error.status == 409) alert("Матрица не согласована");
          console.log(error);
        }
      );
  }
}
