import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfile} from "../models/user-profile.interface";
import {HttpService} from "../services/http.service";
import {Role} from "../models/role.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [HttpService]
})
export class ProfileComponent implements OnInit {
  private id: number;
  public userProfile: UserProfile;
  public updateProfile: UserProfile;
  flagIsUpdated: boolean = false;

  constructor(private httpService: HttpService,
              private route: Router) {
  }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem('id'));
    if (this.id == null || isNaN(this.id)) this.route.navigateByUrl("/");
    this.httpService.getExpert(this.id)
      .subscribe(
        (data: UserProfile) => {
          this.userProfile = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  updateUser(model: UserProfile, isValid: boolean) {
    this.updateProfile = new UserProfile(this.userProfile.id, model.firstName, model.lastName, model.patronymic,
      this.userProfile.email, this.userProfile.password, model.position, new Role("2", "user"));
    this.httpService.addOrUpdateUser(this.updateProfile)
      .subscribe(
        (data: UserProfile) => {
          this.userProfile = data;
          this.flagIsUpdated = true;
        },
        error => console.log(error)
      );
  }
}
