import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themes: Array<any> = [
    { value: 'light', name: 'Chiaro', cssClass: 'light-theme' },
    { value: 'black', name: 'Scuro', cssClass: 'black-theme' },
    { value: 'fmxls-light', name: 'FMXLS-Chiaro', cssClass: 'fmxls-light-theme' }
  ];

  adminTheme: Array<any> = [
    { cssClass: 'admin-default-theme' }
  ];

  constructor() {}

  updateTheme() {
    const theme = localStorage.getItem('theme');
    if (theme !== undefined) {
      const selectedTheme = JSON.parse(theme);
      if (selectedTheme !== null && selectedTheme.cssClass) {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add(selectedTheme.cssClass);
      }
    }

    if (theme == null) {
        localStorage.setItem('theme', JSON.stringify(this.themes[0]));
        const body = document.getElementsByTagName('body')[0];
        body.classList.add(this.themes[0].cssClass);
    }
  }

  currentTheme() {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme != null) {
      const tmpTheme = JSON.parse(storedTheme);
      // tslint:disable-next-line: no-shadowed-variable
      const theme = this.themes.filter(theme => theme.value && theme.value === tmpTheme.value);

      if (theme != null) {
        return theme[0];
      }
    }
    return this.themes[0];
  }

  setTheme(theme: any) {
    const body = document.getElementsByTagName('body')[0];
    // tslint:disable-next-line: no-shadowed-variable
    this.themes.forEach(theme => body.classList.remove(theme.cssClass));
    localStorage.removeItem('theme');

    if (theme.cssClass) {
      localStorage.setItem('theme', JSON.stringify(theme));
      body.classList.add(theme.cssClass);
    }
  }

  // // Admin
  // updateAdminTheme() {
  //   const adminTheme = localStorage.getItem('admin-theme');
  //   if (adminTheme !== undefined) {
  //     const selectedTheme = JSON.parse(adminTheme);
  //     if (selectedTheme !== null && selectedTheme.cssClass) {
  //       const body = document.getElementsByTagName('body')[0];
  //       body.classList.add(selectedTheme.cssClass);
  //     }
  //   }

  //   if (adminTheme == null) {
  //       localStorage.setItem('admin-theme', JSON.stringify(this.adminTheme[0]));
  //       const body = document.getElementsByTagName('body')[0];
  //       body.classList.add(this.adminTheme[0].cssClass);
  //   }
  // }

}
