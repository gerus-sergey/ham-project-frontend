import {Component, OnInit} from '@angular/core';
import {UserRegistered} from "../models/user-registered.interface";
import {HttpService} from "../services/http.service";
import {LocalStorageService} from "angular-2-local-storage";

export class Form {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent implements OnInit {
  userRegistered: UserRegistered;
  receivedUser: UserRegistered;
  form: Form = new Form();
  freeEmail: boolean = true;
  remember: boolean = false;

  constructor(private httpService: HttpService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.form = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  checkEmail(isValid: boolean) {
    if (isValid) {
      this.httpService.checkEmail(this.form.email)
        .subscribe((data) => {
            this.freeEmail = false;
          },
          error => this.freeEmail = true
        )
    }
  }

  registeredUser(model: Form, isValid: boolean) {
    if (isValid) {
      this.userRegistered = new UserRegistered(null, model.firstName, model.lastName, model.email, model.password);
      this.httpService.registeredUser(this.userRegistered)
        .subscribe(
          (data: UserRegistered) => {
            this.receivedUser = data;
            console.log(this.receivedUser);
            if (this.remember) {
              localStorage.setItem('id', this.receivedUser.id.toString());
              console.log(localStorage.getItem("id"));
            } else {
              localStorage.setItem('id', null);
            }
          },
          error => console.log(error)
        );
    }
  }

}
