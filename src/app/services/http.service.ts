import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserRegistered} from "../models/user-registered.interface";
import {UserSignIn} from "../authorization/authorization.component";
import {Criterion} from "../models/criterion.interface";
import {Alternative} from "../models/alternative.interface";
import {Dimension} from "../models/dimension.interface";
import {CriterionDimension} from "../models/criterion-dimension.interface";
import {AlternativeDimension} from "../models/alternative-dimension.interface";

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

  addDimension(dimension: Dimension){
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(this.url + '/dimensions', dimension, {
      headers: headers
    });
  }

  deleteDimension(dimensionId: String){
    return this.http.delete(this.url + "/dimensions/" + dimensionId)
  }

  addDimensionCriterions(dimensionId: String, dimensionCriterions: CriterionDimension[]){
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(this.url + '/rating-criterions/' + dimensionId, dimensionCriterions ,{
      headers: headers
    });
  }

  addDimensionAlternatives(dimensionId: String, dimensionAlternatives: AlternativeDimension[]){
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post(this.url + '/rating-alternatives/' + dimensionId, dimensionAlternatives ,{
      headers: headers
    });
  }

  getCriterionSets(){
    return this.http.get(this.url + "/criterion-set");
  }

  getAlternativesSets(){
    return this.http.get(this.url + "/alternatives-set");
  }

  getCriterionsSetsByExpertId(expertId: String){
    return this.http.get(this.url + "/expertsToCriterionSet/CriterionSetsByExpertId/" + expertId)
  }

  getCriterionsByCriterionSetId(criterionSetId: String){
    return this.http.get(this.url + "/criterionsToCriterionSet/criterionsByCriterionSetId/" + criterionSetId)
  }

  getAlternativesSetsByExpertId(expertId: String){
    return this.http.get(this.url + "/expertsToAlternativesSet/alternativesSetsByExpertId/" + expertId)
  }

  getAlternativesByAlternativeSetId(alternativeSetId: String){
    return this.http.get(this.url + "/alternativesToAlternativeSet/alternativesByAlternativeSetId/" + alternativeSetId)
  }

  getExpertsByCriterionSetId(criterionSetId: String){
    return this.http.get(this.url + "/expertsToCriterionSet/expertsByCriterionSetId/" + criterionSetId)
  }

  getExpertsByAlternativeSetId(alternativeSetId: String){
    return this.http.get(this.url + "/expertsToAlternativesSet/expertsByAlternativeSetId/" + alternativeSetId);
  }
}
