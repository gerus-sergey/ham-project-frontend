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

  flagButtons: boolean = false;
  flagRadio: boolean = false;
  flagRange: boolean = false;
  indexOne = [];
  indexTwo = [];
  rangeValue = [];

  constructor(private httpService: HttpService,
              private dimensionService: DimensionService,
              private route: Router) {
  }

  ngOnInit() {
    if(this.dimensionService.evaluateAlternativesMethod == "buttons") this.flagButtons = true;
    if(this.dimensionService.evaluateAlternativesMethod == "radio") this.flagRadio = true;
    if(this.dimensionService.evaluateAlternativesMethod == "range") this.flagRange = true;

    this.matrixAlternatives = this.dimensionService.getAlternatives();
    this.dimensionCriterions = this.dimensionService.getDimensionCriterions();
    this.dimensionId = this.dimensionService.getDimension().id;

    this.alternative = this.matrixAlternatives[0];
    this.criterion = this.dimensionCriterions[0].criterion;

    this.weightAlterntives.length = this.matrixAlternatives.length;

    for (let i = 0; i < this.weightAlterntives.length; i++) {
      this.weightAlterntives[i] = new Array(this.dimensionCriterions.length);
    }

    for (let i = 0; i < this.weightAlterntives.length; i++) {
      for (let j = 0; j < this.weightAlterntives[0].length; j++) {
          this.weightAlterntives[i][j] = 1;
          this.indexOne.push(i);
          this.indexTwo.push(j);
          this.rangeValue.push("0");
      }
    }
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

  setRadio(element: HTMLInputElement, indexOne: number, indexTwo: number): void {
    this.weightAlterntives[indexOne][this.indexTwo[indexTwo]] = parseFloat(element.value);
    console.log(this.weightAlterntives);
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
    this.weightAlterntives[indexOne][this.indexTwo[indexTwo]] = parseFloat(weight);
    this.rangeValue[indexTwo] = value;
    console.log(this.rangeValue);
  }

  dimension() {
    for (let i in this.matrixAlternatives) {
      let a = this.weightAlterntives[i];
      this.dimensionAlternatives[i] = new AlternativeDimension(
        "", this.dimensionId, this.matrixAlternatives[i], "", a.toString());
    }

    this.httpService.addDimensionAlternatives(this.dimensionId, this.dimensionAlternatives)
      .subscribe(
        (data: AlternativeDimension[]) => {
          this.route.navigateByUrl("/dimension-result/" + this.dimensionId);
        },
        error => {
          console.log(error);
        }
      );
  }
}
