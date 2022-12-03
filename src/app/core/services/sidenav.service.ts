import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public sidenavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  mainMenu = [];

  // Admin menu
  adminMenu = [];

  toggle() {
    return this.sidenavToggleSubject.next(null);
  }

  // Main menu gestito dal backend
  loadMainMenu() {
    this.mainMenu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  loadAdminMenu() {
    this.adminMenu = JSON.parse(localStorage.getItem('adminMenu')) || [];
  }
}
