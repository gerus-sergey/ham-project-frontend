import {Alternative} from "./alternative.interface";

export class AlternativesSet{
  id: string;
  name: string;
  comment: string;
  alternatives: Alternative[] = [];


  constructor(id: string, name: string, comment: string, alternatives: Alternative[]) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.alternatives = alternatives;
  }
}
