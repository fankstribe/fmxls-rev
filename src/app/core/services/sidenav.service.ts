import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public sidenavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  mainMenu = [];

  toggle() {
    return this.sidenavToggleSubject.next(null);
  }

  // Main menu gestito dal backend
  loadMainMenu() {
    this.mainMenu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  // Admin menu
  adminMenu: any[] = [
    {
      'name': 'Home',
      'icon': 'home',
      'link': '/admin-home'
    },
    {
      'name': 'Utenti',
      'icon': 'people',
      'link': '/admin-users'
    },
    {
      'name': 'Squadre',
      'icon': 'admin_panel_settings',
      'link': '/admin-teams'
    },
    {
      'name': 'Manager',
      'icon': 'face',
      'link': '/admin-managers'
    },
    {
      'name': 'Tornei',
      'icon': 'emoji_events',
      'link': '/admin-tournaments'
    }
  ];
}
