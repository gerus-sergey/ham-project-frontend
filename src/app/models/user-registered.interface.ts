import {Role} from "./role.interface";

export class UserRegistered {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;


  constructor(id: number, firstName: string, lastName: string, email: string, password: string, role: Role) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
