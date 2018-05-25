import {Alternative} from "./alternative.interface";
import {UserProfile} from "./user-profile.interface";

export class AlternativesSet{
  id: string;
  name: string;
  comment: string;
  alternatives: Alternative[] = [];
  experts: UserProfile[] = [];

  constructor(id: string, name: string, comment: string, alternatives: Alternative[], experts: UserProfile[]) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.alternatives = alternatives;
    this.experts = experts;
  }
}
