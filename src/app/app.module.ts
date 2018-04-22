import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {RegistrationComponent} from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocalStorageModule} from "angular-2-local-storage";
import { SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes =[
//  { path: '', component: HomeComponent},
  { path: 'registered', component: RegistrationComponent},
  // { path: 'login', component: SignInComponent},
  // { path: '**', component: NotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    SidebarComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
