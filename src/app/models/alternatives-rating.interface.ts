import {Alternative} from "./alternative.interface";

export class AlternativesRating {
  id: string;
  dimensionId: string;
  alternative: Alternative[] = [];
  rating: number;
  weights: string

  constructor(id: string, dimensionId: string, alternative: Alternative[], rating: number, weights: string) {
    this.id = id;
    this.dimensionId = dimensionId;
    this.alternative = alternative;
    this.rating = rating;
    this.weights = weights;
  }
}
