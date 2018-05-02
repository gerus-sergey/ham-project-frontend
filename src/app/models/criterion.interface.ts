export class Criterion {
  id: string;
  criterionName: string;
  description: string;

  constructor(id: string, criterionName: string, description: string) {
    this.id = id;
    this.criterionName = criterionName;
    this.description = description;
  }
}
