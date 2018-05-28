import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {CriterionsSet} from "../models/criterions-set.interface";
import {Criterion} from "../models/criterion.interface";
import {AlternativesSet} from "../models/alternatives-set.interface";
import {Alternative} from "../models/alternative.interface";
import {UserRegistered} from "../models/user-registered.interface";
import {UserProfile} from "../models/user-profile.interface";

@Component({
  selector: 'app-sets-page',
  templateUrl: './sets-page.component.html',
  styleUrls: ['./sets-page.component.css']
})
export class SetsPageComponent implements OnInit {
  criterionsSets: CriterionsSet[] = [];
  alternativesSets: AlternativesSet[] = [];

  newCriterionsSet: CriterionsSet;
  newAlternativesSet: AlternativesSet;
  newCriterion: Criterion;
  newAlternative: Alternative;
  experts: UserProfile[] = [];
  setId: string;
  index: string;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {

    this.newCriterionsSet = {
      id: '',
      name: '',
      comment: '',
      criterions: null,
      experts: null,
    };

    this.newAlternativesSet = {
      id: '',
      name: '',
      comment: '',
      alternatives: null,
      experts: null,
    };

    this.newCriterion = {
      id: '',
      criterionName: '',
      description: ''
    };

    this.newAlternative = {
      id: '',
      alternativeName: ''
    };

    this.httpService.getExperts()
      .subscribe(
        (data: UserProfile) => {
          for (let index in data) {
            this.experts.push(data[index]);
          }
        },
        error => {
          console.log(error);
        }
      );

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

  addNewCriterionsSet(model: CriterionsSet, isValid: boolean) {
    this.httpService.addCriterionsSet(new CriterionsSet('', model.name, model.comment, null, null))
      .subscribe(
        (data: CriterionsSet) => {
          data.experts = [];
          data.criterions =[];
          this.criterionsSets.push(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  addNewAlternativesSet(model: AlternativesSet, isValid: boolean) {
    this.httpService.addAlternativesSet(new AlternativesSet('', model.name, model.comment, null, null))
      .subscribe(
        (data: AlternativesSet) => {
          data.experts = [];
          data.alternatives =[];
          this.alternativesSets.push(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteCriterionsSet(criterionsSetId: string, index: number) {
    this.httpService.deleteCriterionsSet(criterionsSetId)
      .subscribe(
        (data: UserRegistered) => {
          console.log(data);
          this.criterionsSets.splice(index, 1);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteAlternativesSet(alternativesSetId: string, index: number) {
    this.httpService.deleteAlternativesSet(alternativesSetId)
      .subscribe(
        (data: UserRegistered) => {
          console.log(data);
          this.alternativesSets.splice(index, 1);
        },
        error => {
          console.log(error);
        }
      );
  }

  addExpertInCriterionSet(expertId: number, index: number) {
    this.httpService.addExpertToCriterionsSet(this.setId, expertId)
      .subscribe(
        (data) => {
          this.criterionsSets[this.index].experts.push(this.experts[index]);
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  addExpertInAlternativeSet(expertId: number, index: number) {
    this.httpService.addExpertToAlternativeSet(this.setId, expertId)
      .subscribe(
        (data) => {
          this.alternativesSets[this.index].experts.push(this.experts[index]);
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  addNewCriterion(model: Criterion, isValid: boolean) {
    this.httpService.addCriterion(new Criterion(model.id, model.criterionName, model.description))
      .subscribe(
        (criterion: Criterion) => {
          this.httpService.addCriterionToCriterionSet(criterion.id, this.setId)
            .subscribe(
              (data) => {
                this.criterionsSets[this.index].criterions.push(criterion);
                console.log(data);
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
        }
      );
  }

  addNewAlternativeInSet(model: Alternative, isValid: boolean) {
    console.log(model);
    this.httpService.addAlternative(new Alternative(model.id, model.alternativeName))
      .subscribe(
        (data: Alternative) => {
          this.alternativesSets[this.index].alternatives.push(data);
          this.httpService.addAlternativeToAlternativeSet(data.id, this.setId)
            .subscribe(
              (data) => {
                console.log(data);
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
        }
      );
  }

  addSetInfoForInsert(id: string, setId: string) {
    this.setId = setId;
    this.index = id;
  }

  deleteCriterion(criterionSetId: string, criterionId: string, indexCriterionSet: string, indexCriterion: string) {
    this.httpService.deleteCriterionToCriterionSet(criterionSetId, criterionId)
      .subscribe(
        (data) => {
          console.log(data);
          this.criterionsSets[indexCriterionSet].criterions.splice(indexCriterion, 1);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteAlternative(alternativeSetId: string, alternativeId: string, indexAlternativeSet: string, indexAlternative: string) {
    this.httpService.deleteAlternativeToAlternativeSet(alternativeSetId, alternativeId)
      .subscribe(
        (data) => {
          console.log(data);
          this.alternativesSets[indexAlternativeSet].alternatives.splice(indexAlternative, 1);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteExpertInCriterionSet(criterionSetId: string, expertId: number, indexCriterionSet: string, indexExpert: string) {
    this.httpService.deleteExpertFromCriterionSet(criterionSetId, expertId)
      .subscribe(
        (data) => {
          console.log(data);
          this.criterionsSets[indexCriterionSet].experts.splice(indexExpert, 1);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteExpertInAlternativeSet(alternativesSetId: string, expertId: number, indexAlternativesSet: string, indexExpert: string) {
    this.httpService.deleteExpertFromAlternativesSet(alternativesSetId, expertId)
      .subscribe(
        (data) => {
          console.log(data);
          this.alternativesSets[indexAlternativesSet].experts.splice(indexExpert, 1);
        },
        error => {
          console.log(error);
        }
      );
  }
}
