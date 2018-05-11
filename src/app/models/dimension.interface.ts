export class Dimension {
  id: string;
  expertId: string;
  date: Date;
  name: string;
  comment: string;

  constructor(id: string, expertId: string, date: Date, name: string, comment: string) {
    this.id = id;
    this.expertId = expertId;
    this.date = date;
    this.name = name;
    this.comment = comment;
  }


}
