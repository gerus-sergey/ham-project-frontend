import {Alternative} from "./alternative.interface";

export class AlternativeDimensionInterface {
  id: String;
  dimensionId: String;
  alternative: Alternative;
  rating: String;
  weights: String;

  constructor(id: String, dimensionId: String, alternative: Alternative, rating: String, weights: String) {
    this.id = id;
    this.dimensionId = dimensionId;
    this.alternative = alternative;
    this.rating = rating;
    this.weights = weights;
  }
}
