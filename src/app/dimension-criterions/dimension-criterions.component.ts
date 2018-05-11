import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Criterion} from "../models/criterion.interface";
import {DimensionService} from "../services/dimension.service";
import {CriterionDimension} from "../models/criterion-dimension.interface";


@Component({
  selector: 'app-dimension-criterions',
  templateUrl: './dimension-criterions.component.html',
  styleUrls: ['./dimension-criterions.component.css'],
  providers: [HttpService]
})
export class DimensionCriterionsComponent implements OnInit {
  matrCriterion: Criterion[] = [];
  matrDimension: CriterionDimension[] = [];
  firstCriterion: Criterion;
  secondCriterion: Criterion;
  radioValue: string = "1";

  weightCriterion = [];
  first: number = 0; //счётчик первого критерия при выводе
  second: number = 1;  //счётчик второго критерия при выводе

  constructor(private httpService: HttpService,
              private dimensionService: DimensionService) {
  }

  ngOnInit() {
    this.matrCriterion = this.dimensionService.dimensionCriterions;
    console.log(this.matrCriterion);

    // this.matrCriterion.push(new Criterion("1", "name1", "qwe", "12"));
    // this.matrCriterion.push(new Criterion("2", "name2", "qwe", "12"));
    // this.matrCriterion.push(new Criterion("3", "name3", "qwe", "12"));
    // this.matrCriterion.push(new Criterion("4", "name4", "qwe", "12"));

    this.firstCriterion = this.matrCriterion[0];
    this.secondCriterion = this.matrCriterion[1];

    this.weightCriterion.length = this.matrCriterion.length;
    for (let i = 0; i < this.weightCriterion.length; i++) {
      this.weightCriterion[i] = new Array(this.matrCriterion.length);
    }

    for (let i = 0; i < this.matrCriterion.length; i++) {
      for (let j = 0; j < this.matrCriterion.length; j++) {

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

    if (this.first == this.matrCriterion.length - 1 && this.second == this.matrCriterion.length - 2) {
      this.weightCriterion[this.first][this.second] = weight;
      alert("все критерии сравнены");
      console.log(this.weightCriterion);
    } else {
      this.weightCriterion[this.first][this.second] = weight;
      if (this.second >= this.matrCriterion.length - 1) {
        this.first++;
        this.second = 0;
      } else {
        this.second++;
      }
      if (this.first === this.second) {
        this.second++;
      }
      this.firstCriterion = this.matrCriterion[this.first];
      this.secondCriterion = this.matrCriterion[this.second];
    }
    console.log(this.weightCriterion);
    console.log(this.first + " " + this.second);
  }

  lastCriterion() {
    if (this.first == 0 && this.second == 1) {
      console.log("Конец")
    } else {
      if (this.second == 0) {
        this.first--;
        this.second = this.matrCriterion.length - 1;
      } else {
        this.second--;
        if (this.first == this.second) {
          this.second--;
        }
      }
      this.firstCriterion = this.matrCriterion[this.first];
      this.secondCriterion = this.matrCriterion[this.second];
    }
    console.log(this.weightCriterion);
    console.log(this.first + " " + this.second);
  }

  dimension() {
    for (let i in this.matrCriterion) {
      let a = this.weightCriterion[i];
      this.matrDimension.push(new CriterionDimension("", this.dimensionService.dimension.id, this.matrCriterion[i], "", a.toString()));
    }
    this.httpService.addDimensionCriterions(this.dimensionService.dimension.id, this.matrDimension)
      .subscribe(
        (data: CriterionDimension[]) => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    console.log(this.matrDimension);
  }
}
