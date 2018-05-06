
export class Criterion {
  id: string;
  criterionName: string;
  description: string;
  expertId: String

  constructor(id: string, criterionName: string, description: string, expertId: String) {
    this.id = id;
    this.criterionName = criterionName;
    this.description = description;
    this.expertId = expertId;
  }
}
