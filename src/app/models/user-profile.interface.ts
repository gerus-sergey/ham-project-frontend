import {Role} from "./role.interface";

export class UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  password: string;
  position: string;
  role: Role;


  constructor(id: number, firstName: string, lastName: string, patronymic: string, email: string, password: string, position: string, role: Role) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.patronymic = patronymic;
    this.email = email;
    this.password = password;
    this.position = position;
    this.role = role;
  }
}
