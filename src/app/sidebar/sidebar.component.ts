import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MainService} from "../services/main.service";

declare var gnMenu: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private id: number;
  flagRegistration: boolean = false;
  flagRole: boolean = false;

  constructor(private sidebarEl: ElementRef,
              private route: Router,
              private mainService: MainService) {
    this.mainService.isAuth$.subscribe(
      isAuth => {
        console.log(isAuth);
        if (isAuth == true) document.getElementById('menu').style.display = 'block';
        this.flagRegistration = true;
      }
    )
  }

  ngOnInit() {
    new gnMenu(this.sidebarEl.nativeElement.querySelector('.gn-menu-main'));
    this.id = parseInt(localStorage.getItem('id'));

    if (this.id != null && !isNaN(this.id)) {
      this.flagRegistration = true;
    } else {
      document.getElementById('menu').style.display = 'none';
    }
    if (localStorage.getItem('role') == "1") this.flagRole = true;
  }

  logout() {
    localStorage.setItem('id', null);
    this.id = null;
    this.flagRegistration = false;
    this.route.navigateByUrl("/");
    document.getElementById('menu').style.display = 'none';
  }
}
