import {Criterion} from "./criterion.interface";

export class CriterionsSet {
  id: string;
  name: string;
  comment: string;
  criterions: Criterion[] = [];

  constructor(id: string, name: string, comment: string, criterions: Criterion[]) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.criterions = criterions;
  }
}
