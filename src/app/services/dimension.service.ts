import {Injectable} from "@angular/core";
import {Criterion} from "../models/criterion.interface";
import {Alternative} from "../models/alternative.interface";

@Injectable()
export class DimensionService{
  dimensionCriterions: Criterion[] = [];
  dimensionAlternatives: Alternative[] = [];

  addCriterions(criterions: Criterion[]){
    this.dimensionCriterions = criterions;
  }

  addAlternatives(alternatives: Alternative[]){
    this.dimensionAlternatives = alternatives;
  }
}
