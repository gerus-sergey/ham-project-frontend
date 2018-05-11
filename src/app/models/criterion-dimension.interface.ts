import {Criterion} from "./criterion.interface";

export class CriterionDimension {
  id: String;
  dimensionId: String;
  criterion: Criterion;
  rating: String;
  weights: String;

  constructor(id: String, dimensionId: String, criterion: Criterion, rating: String, weights: String) {
    this.id = id;
    this.dimensionId = dimensionId;
    this.criterion = criterion;
    this.rating = rating;
    this.weights = weights;
  }
}
