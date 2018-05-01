export class UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  password: string;
  position: string;


  constructor(id: number, firstName: string, lastName: string, patronymic: string, email: string, password: string, position: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.patronymic = patronymic;
    this.email = email;
    this.password = password;
    this.position = position;
  }
}
