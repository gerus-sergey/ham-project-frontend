import {Injectable} from "@angular/core";
import {Criterion} from "../models/criterion.interface";
import {Alternative} from "../models/alternative.interface";
import {Dimension} from "../models/dimension.interface";

@Injectable()
export class DimensionService{
  dimension: Dimension;
  dimensionCriterions: Criterion[] = [];
  dimensionAlternatives: Alternative[] = [];

  addDimension(dimension: Dimension){
    this.dimension = dimension;
  }

  addCriterions(criterions: Criterion[]){
    this.dimensionCriterions = criterions;
  }

  addAlternatives(alternatives: Alternative[]){
    this.dimensionAlternatives = alternatives;
  }
}
