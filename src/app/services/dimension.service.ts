import {Injectable} from "@angular/core";
import {Criterion} from "../models/criterion.interface";
import {Alternative} from "../models/alternative.interface";
import {Dimension} from "../models/dimension.interface";
import {CriterionDimension} from "../models/criterion-dimension.interface";

@Injectable()
export class DimensionService {
  private dimension: Dimension;
  private criterions: Criterion[] = [];
  private alternatives: Alternative[] = [];
  private dimensionCriterions: CriterionDimension[] = [];
  evaluateCriterionsMethod: string;
  evaluateAlternativesMethod: string;

  setDimension(dimension: Dimension) {
    this.dimension = dimension;
  }

  getDimension() {
    return this.dimension;
  }

  setCriterions(criterions: Criterion[]) {
    this.criterions = criterions;
  }

  getCriterions() {
    return this.criterions;
  }

  setAlternatives(alternatives: Alternative[]) {
    this.alternatives = alternatives;
  }

  getAlternatives() {
    return this.alternatives;
  }

  setDimensionCriterions(dimensionCriterions: CriterionDimension[]) {
    this.dimensionCriterions = dimensionCriterions;
  }

  getDimensionCriterions(){
    return this.dimensionCriterions;
  }
}
