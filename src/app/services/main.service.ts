import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MainService {
  private isAuthSubject = new Subject<boolean>();
  isAuth$ = this.isAuthSubject.asObservable();

  setIsAuth(isAuth:boolean) {
    this.isAuthSubject.next(isAuth);
  }
}
