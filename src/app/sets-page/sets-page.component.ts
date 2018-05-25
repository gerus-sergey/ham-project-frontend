import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {CriterionsSet} from "../models/criterions-set.interface";
import {Criterion} from "../models/criterion.interface";
import {AlternativesSet} from "../models/alternatives-set.interface";
import {Alternative} from "../models/alternative.interface";
import {UserRegistered} from "../models/user-registered.interface";

@Component({
  selector: 'app-sets-page',
  templateUrl: './sets-page.component.html',
  styleUrls: ['./sets-page.component.css']
})
export class SetsPageComponent implements OnInit {
  criterionsSets: CriterionsSet[] = [];
  alternativesSets: AlternativesSet[] = [];

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getCriterionSets()
      .subscribe(
        (data: CriterionsSet) => {
          for (let index in data) {
            let criterionSet: CriterionsSet = data[index];
            criterionSet.criterions = [];
            criterionSet.experts = [];
            this.httpService.getCriterionsByCriterionSetId(data[index].id)
              .subscribe(
                (data: Criterion) => {
                  for (let index in data) {
                    criterionSet.criterions.push(data[index]);
                  }
                },
                error => {
                  console.log(error);
                }
              );
            this.httpService.getExpertsByCriterionSetId(data[index].id)
              .subscribe(
                (data: UserRegistered) => {
                  console.log(data);
                  for (let index in data) {
                    criterionSet.experts.push(data[index]);
                  }
                },
                error => {
                  console.log(error);
                }
              );
            this.criterionsSets.push(criterionSet);
          }
          console.log(this.criterionsSets);
        },
        error => {
          console.log(error);
        }
      );

    this.httpService.getAlternativesSets()
      .subscribe(
        (data: AlternativesSet) => {
          for (let index in data) {
            let alternativeSet: AlternativesSet = data[index];
            alternativeSet.alternatives = [];
            alternativeSet.experts = [];
            this.httpService.getAlternativesByAlternativeSetId(data[index].id)
              .subscribe(
                (data: Alternative) => {
                  for (let index in data) {
                    alternativeSet.alternatives.push(data[index]);
                  }
                },
                error => {
                  console.log(error);
                }
              );
            this.httpService.getExpertsByAlternativeSetId(data[index].id)
              .subscribe(
                (data: UserRegistered) => {
                  console.log(data);
                  for (let index in data) {
                    alternativeSet.experts.push(data[index]);
                  }
                },
                error => {
                  console.log(error);
                }
              );
            this.alternativesSets.push(alternativeSet);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteCriterionSet(i: string) {
  }

  deleteAlternativeSet(i: string){}

  addExpertInCriterionSet(i: string){
  }
}
