import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserRegistered} from "../models/user-registered.interface";
import {UserSignIn} from "../authorization/authorization.component";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  url: String = "http://localhost:8080";

  registeredUser(user: UserRegistered) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(this.url + '/experts', user, {
      headers: headers
    });
  }

  checkEmail(email: String) {
    return this.http.get(this.url + '/experts/getByEmail/' + email);
  }

  signIn(user: UserSignIn) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(this.url + '/experts/login', user, {
      headers: headers
    });
  }
}
