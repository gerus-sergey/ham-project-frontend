import {Component, OnInit} from '@angular/core';
import {Dimension} from "../models/dimension.interface";
import {HttpService} from "../services/http.service";
import {Criterion} from "../models/criterion.interface";
import {Alternative} from "../models/alternative.interface";
import {DimensionService} from "../services/dimension.service";
import {Router} from "@angular/router";
import {CriterionsSet} from "../models/criterions-set.interface";

@Component({
  selector: 'app-dimension-start',
  templateUrl: './dimension-start.component.html',
  styleUrls: ['./dimension-start.component.css']
})
export class DimensionStartComponent implements OnInit {
  public id: String;
  dimension: Dimension;

  criterionsSets: CriterionsSet[] = [];

  criterions: Criterion[] = [];
  newCriterion: Criterion;
  criterionsResult: Criterion[] = [];

  alternatives: Alternative[] = [];
  newAlternative: Alternative;
  alternativesResult: Alternative[] = [];

  nameCriterionOption: string = "chooseCriterionSet";
  nameAlternativeOption: string = "chooseAlternativeSet";

  visibleCreateCriterionSet: boolean = false;
  visibleChooseCriterionSet: boolean = false;

  visibleCreateAlternativeSet: boolean = false;
  visibleChooseAlternativeSet: boolean = false;

  flag: boolean = true;
  flagSaveSettingsButton: boolean = false;

  constructor(private httpService: HttpService,
              private dimensionService: DimensionService,
              private route: Router) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.dimension = {
      id: '',
      expertId: '',
      date: new Date(),
      name: '',
      comment: ''
    };

    this.newCriterion = {
      id: '',
      criterionName: '',
      description: '',
      expertId: ''
    };

    this.newAlternative = {
      id: '',
      alternativeName: '',
      expertId: ''
    };

    this.httpService.getCriterionsSetsByExpertId(this.id)
      .subscribe(
        (data: CriterionsSet) => {
          for (let index in data) {
            let criterionSet: CriterionsSet = data[index];
            criterionSet.criterions = [];
            this.httpService.getCriterionsByCriterionSetId(data[index].id)
              .subscribe(
                (data: Criterion) => {
                  for (let index in data) {
                    criterionSet.criterions.push(data[index]);
                  }
                  this.criterionsSets.push(criterionSet);
                  console.log(this.criterionsSets)
                },
                error => {
                  console.log(error);
                }
              );
          }
        },
        error => {
          console.log(error);
        }
      );

    this.httpService.getAlternativesByExpertId(this.id)
      .subscribe(
        (data: Alternative) => {
          for (let index in data) {
            this.alternatives.push(data[index])
          }
          console.log(this.alternatives)
        },
        error => {
          console.log(error);
        }
      );

    this.httpService.getCriterionsByExpertId(this.id)
      .subscribe(
        (data: Criterion) => {
          for (let index in data) {
            this.criterions.push(data[index])
          }
          console.log(this.criterions)
        },
        error => {
          console.log(error);
        }
      );
  }

  addDimension(model: Dimension, isValid: boolean) {

    this.dimension = new Dimension("", this.id.toString(), new Date(), model.name, model.comment);

    this.httpService.addDimension(this.dimension)
      .subscribe(
        (data: Dimension) => {
          this.dimensionService.setDimension(data);
          this.dimensionService.setCriterions(this.criterionsResult);
          this.dimensionService.setAlternatives(this.alternativesResult);
          this.route.navigateByUrl("/dimension-criterion");
        },
        error => {
          console.log(error);
        }
      );
  }

  chooseCriterionOption(element: HTMLInputElement): void {
    this.nameCriterionOption = element.value;
    console.log(element.value);
  }

  chooseAlternativeOption(element: HTMLInputElement): void {
    this.nameAlternativeOption = element.value;
  }

  chooseCriterionsSet(criterionSetId: string){
    this.criterionsResult = this.criterionsSets[criterionSetId].criterions;
  }

  saveSettings() {
    if (this.nameCriterionOption == "chooseCriterionSet") {
      this.visibleChooseCriterionSet = true;
    } else if (this.nameCriterionOption == "createCriterionSet") {
      this.visibleCreateCriterionSet = true;
    }

    if (this.nameAlternativeOption == "chooseAlternativeSet") {
      this.visibleChooseAlternativeSet = true;
    } else if (this.nameAlternativeOption == "createAlternativeSet") {
      this.visibleCreateAlternativeSet = true;
    }

    this.flagSaveSettingsButton = true;
    this.flag = false;
  }

  addCriterionFromDB(element: HTMLInputElement): void {
    this.criterionsResult.push(this.criterions[element.value]);
    this.criterions.splice(parseInt(element.value), 1);

    console.log(this.criterionsResult);
  }

  addNewCriterion(model: Criterion, isValid: boolean) {
    this.httpService.addCriterion(new Criterion(model.id, model.criterionName, model.description, this.id))
      .subscribe(
        (data: Criterion) => {
          this.criterionsResult.push(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  addAlternativeFromDB(element: HTMLInputElement): void {
    this.alternativesResult.push(this.alternatives[element.value]);
    this.alternatives.splice(parseInt(element.value), 1);

    console.log(this.alternativesResult);
  }

  addNewAlternative(model: Alternative, isValid: boolean) {
    this.httpService.addAlternative(new Alternative(model.id, model.alternativeName, this.id))
      .subscribe(
        (data: Alternative) => {
          this.alternativesResult.push(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteCriterion(i: number) {
    console.log(i);
    if (this.criterionsResult[i].id != null) {
      this.criterions.push(this.criterionsResult[i]);
      this.criterionsResult.splice(i, 1);
    } else {
      this.criterionsResult.splice(i, 1);
    }
  }

  deleteAlternative(i: number) {
    if (this.alternativesResult[i].id != null) {
      this.alternatives.push(this.alternativesResult[i]);
      this.alternativesResult.splice(i, 1);
    } else {
      this.alternativesResult.splice(i, 1);
    }
  }

}
