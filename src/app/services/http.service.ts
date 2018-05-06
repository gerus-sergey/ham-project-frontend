import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserRegistered} from "../models/user-registered.interface";
import {UserSignIn} from "../authorization/authorization.component";
import {Criterion} from "../models/criterion.interface";
import {Alternative} from "../models/alternative.interface";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  url: String = "http://localhost:8080";

  addOrUpdateUser(user: UserRegistered) {
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

  getExpert(expertId: String) {
    return this.http.get(this.url + "/experts/" + expertId)
  }

  getDimensions(expertId: String) {
    return this.http.get(this.url + "/dimensions/expert/" + expertId)
  }

  getRatingAlternativesByDimension(dimensionId: String) {
    return this.http.get(this.url + "/rating-alternatives/dimension/" + dimensionId)
  }

  getRatingCriterionsByDimension(dimensionId: String) {
    return this.http.get(this.url + "/rating-criterions/dimension/" + dimensionId)
  }

  getAlternativesByExpertId(expertId: String) {
    return this.http.get(this.url + "/alternatives/expert/" + expertId)
  }

  getCriterionsByExpertId(expertId: String) {
    return this.http.get(this.url + "/criterions/expert/" + expertId)
  }

  addCriterion(criterion: Criterion) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(this.url + '/criterions', criterion, {
      headers: headers
    });
  }

  addAlternative(alternative: Alternative){
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(this.url + '/alternatives', alternative, {
      headers: headers
    });
  }
}
