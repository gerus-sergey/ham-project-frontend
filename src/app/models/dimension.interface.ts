export class Dimension {
  id: string;
  expertId: string;
  date: string;
  name: string;
  info: string;

  constructor(id: string, expertId: string, date: string, name: string, info: string) {
    this.id = id;
    this.expertId = expertId;
    this.date = date;
    this.name = name;
    this.info = info;
  }
}
