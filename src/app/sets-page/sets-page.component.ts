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
  idSet: string;
  indexSet: string;

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
          data.criterions = [];
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
          data.alternatives = [];
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
          this.alternativesSets.splice(index, 1);
        },
        error => {
          console.log(error);
        }
      );
  }

  addExpertInCriterionSet(expertId: number, index: number) {
    let existExpert;
    for (let index in this.criterionsSets[this.indexSet].experts) {
      if (this.criterionsSets[this.indexSet].experts[index].id == expertId) {
        existExpert = true;
      }
    }

    if (existExpert != true) {
      this.httpService.addExpertToCriterionsSet(this.idSet, expertId)
        .subscribe(
          (data) => {
            this.criterionsSets[this.indexSet].experts.push(this.experts[index]);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      alert("expert exist");
    }
  }

  addExpertInAlternativeSet(expertId: number, index: number) {
    let existExpert;
    for (let index in this.alternativesSets[this.indexSet].experts) {
      if (this.alternativesSets[this.indexSet].experts[index].id == expertId) {
        existExpert = true;
      }
    }

    if (existExpert != true) {
      this.httpService.addExpertToAlternativeSet(this.idSet, expertId)
        .subscribe(
          (data) => {
            this.alternativesSets[this.indexSet].experts.push(this.experts[index]);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      alert("exist expert");
    }
  }

  addNewCriterion(model: Criterion, isValid: boolean) {
    this.httpService.addCriterion(new Criterion(model.id, model.criterionName, model.description))
      .subscribe(
        (criterion: Criterion) => {
          this.httpService.addCriterionToCriterionSet(criterion.id, this.idSet)
            .subscribe(
              (data) => {
                this.criterionsSets[this.indexSet].criterions.push(criterion);
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
    this.httpService.addAlternative(new Alternative(model.id, model.alternativeName))
      .subscribe(
        (data: Alternative) => {
          this.alternativesSets[this.indexSet].alternatives.push(data);
          this.httpService.addAlternativeToAlternativeSet(data.id, this.idSet)
            .subscribe(
              (data) => {
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
    this.idSet = setId;
    this.indexSet = id;
  }

  deleteCriterion(criterionSetId: string, criterionId: string, indexCriterionSet: string, indexCriterion: string) {
    this.httpService.deleteCriterionToCriterionSet(criterionSetId, criterionId)
      .subscribe(
        (data) => {
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
          this.alternativesSets[indexAlternativesSet].experts.splice(indexExpert, 1);
        },
        error => {
          console.log(error);
        }
      );
  }
}
