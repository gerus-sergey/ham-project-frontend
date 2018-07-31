import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {RegistrationComponent} from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocalStorageModule} from "angular-2-local-storage";
import { SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule, Routes} from "@angular/router";
import { AuthorizationComponent } from './authorization/authorization.component';
import { ProfileComponent } from './profile/profile.component';
import { DimensionResultComponent } from './dimension-result/dimension-result.component';
import { DimensionHistoryComponent } from './dimension-history/dimension-history.component';
import { DimensionStartComponent } from './dimension-start/dimension-start.component';
import {DimensionService} from "./services/dimension.service";
import { DimensionCriterionsComponent } from './dimension-criterions/dimension-criterions.component';
import { HomePageComponent } from './home-page/home-page.component';
import {HttpService} from "./services/http.service";
import { ErrorPageComponent } from './error-page/error-page.component';
import { DimensionAlternativesComponent } from './dimension-alternatives/dimension-alternatives.component';
import { SetsPageComponent } from './sets-page/sets-page.component';
import {MainService} from "./services/main.service";
import {EqualValidator} from "./directives/equal-validator.directive";


const appRoutes: Routes =[
  { path: '', component: HomePageComponent},
  { path: 'registered', component: RegistrationComponent},
  { path: 'login', component: AuthorizationComponent},
  { path: 'account', component: ProfileComponent},
  { path: 'history', component: DimensionHistoryComponent},
  { path: 'dimension-result/:id', component: DimensionResultComponent},
  { path: 'dimension-start', component: DimensionStartComponent},
  { path: 'dimension-criterion', component: DimensionCriterionsComponent},
  { path: 'dimension-alternative', component: DimensionAlternativesComponent},
  { path: 'sets', component: SetsPageComponent},
  { path: '**', component: ErrorPageComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    SidebarComponent,
    AuthorizationComponent,
    ProfileComponent,
    DimensionResultComponent,
    DimensionHistoryComponent,
    DimensionStartComponent,
    DimensionCriterionsComponent,
    HomePageComponent,
    ErrorPageComponent,
    DimensionAlternativesComponent,
    SetsPageComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LocalStorageModule.withConfig({
      prefix: 'app-root',
      //  storageType: 'localStorage'
      storageType: 'sessionStorage'
    }),
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [DimensionService, HttpService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
