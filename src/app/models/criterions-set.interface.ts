import {Criterion} from "./criterion.interface";
import {UserProfile} from "./user-profile.interface";

export class CriterionsSet {
  id: string;
  name: string;
  comment: string;
  criterions: Criterion[] = [];
  experts: UserProfile[] = [];


  constructor(id: string, name: string, comment: string, criterions: Criterion[], experts: UserProfile[]) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.criterions = criterions;
    this.experts = experts;
  }
}
