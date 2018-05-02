import {Criterion} from "./criterion.interface";

export class CriterionsRating {
  id: string;
  dimensionId: string;
  criterion: Criterion[] = [];
  rating: number;
  weights: string;

  constructor(id: string, dimensionId: string, criterion: Criterion[], rating: number, weights: string) {
    this.id = id;
    this.dimensionId = dimensionId;
    this.criterion = criterion;
    this.rating = rating;
    this.weights = weights;
  }
}
