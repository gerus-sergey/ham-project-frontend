import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {UserRegistered} from "../models/user-registered.interface";
import {Router} from "@angular/router";

export class UserSignIn {
  email: string;
  password: string;
}

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  providers: [HttpService]
})

export class AuthorizationComponent implements OnInit {

  authorizationUser: UserSignIn;
  receivedUser: UserRegistered;
  done: boolean = true;

  constructor(private httpService: HttpService,
              private route: Router) {
  }

  ngOnInit() {
    this.authorizationUser = {
      email: '',
      password: ''
    }
  }

  signIn(model: UserSignIn, isValid: boolean) {
    if (isValid) {
      this.httpService.signIn(model)
        .subscribe(
          (data: UserRegistered) => {
            this.done = true;
            this.receivedUser = data;
            this.route.navigateByUrl("/account");
            localStorage.setItem('id', this.receivedUser.id.toString());
            console.log(localStorage.getItem('id'));
          },
          error => {
            console.log(error);
            this.done = false
          }
        );
    }
  }

}
