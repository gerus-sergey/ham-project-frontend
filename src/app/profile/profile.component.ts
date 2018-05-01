import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfile} from "../models/user-profile.interface";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [HttpService]
})
export class ProfileComponent implements OnInit {
  public userProfile: UserProfile;
  public updateProfile: UserProfile;
  public id: String;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
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
      this.userProfile.email, this.userProfile.password, model.position);
    this.httpService.addOrUpdateUser(this.updateProfile)
      .subscribe(
        (data: UserProfile) => {
          this.userProfile = data;
          console.log(this.userProfile);
        },
        error => console.log(error)
      );
    console.log(this.updateProfile);
  }

}
