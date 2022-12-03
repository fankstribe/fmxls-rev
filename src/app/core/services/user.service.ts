import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { SignupForm } from '../../interfaces/signup-form';
import { LoginForm } from '../../interfaces/login-form';

import { User } from '../../models/user';
import { convertDate } from 'src/shared/utils/convert-date';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }

  get uid(): any {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getLocalStorage(token: string, menu: any, adminMenu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
    localStorage.setItem('adminMenu', JSON.stringify(adminMenu));
  }

  validateToken(): Observable<boolean> {
    const url = `${base_url}/login/autologin`;

    return this.http.get(url, this.headers).pipe(
      map((res: any) => {
        const { email, name, birthDate, role, img = '', uid } = res.user;
        this.user = new User(name, email, '', birthDate, img, role, uid);
        this.getLocalStorage(res.token, res.menu, res.adminMenu);
        return true;
      }),
      catchError((error) => of(false))
    );
  }

  createUser(formData: SignupForm) {
    const url = `${base_url}/users`;

    return this.http.post(url, formData).pipe(
      tap((res: any) => {
        this.getLocalStorage(res.token, res.menu, res.adminMenu);
      })
    );
  }

  updateName(data: { name: string; email: string; role: string }) {
    const url = `${base_url}/users/${this.uid}`;

    data = {
      ...data,
      email: this.user.email,
      role: this.user.role,
    };

    return this.http.put(url, data, this.headers);
  }

  updateEmail(data: { name: string; email: string; role: string }) {
    const url = `${base_url}/users/${this.uid}`;

    data = {
      ...data,
      name: this.user.name,
      role: this.user.role,
    };

    return this.http.put(url, data, this.headers);
  }

  updateBirthDate(data: {
    name: string;
    email: string;
    birthDate: Date;
    role: string;
  }) {
    const url = `${base_url}/users/${this.uid}`;

    data = {
      ...data,
      name: this.user.name,
      email: this.user.email,
      role: this.user.role,
    };

    return this.http.put(url, data, this.headers);
  }

  login(formData: LoginForm) {
    const url = `${base_url}/login`;

    return this.http.post(url, formData).pipe(
      tap((res: any) => {
        this.getLocalStorage(res.token, res.menu, res.adminMenu);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('adminMenu');
    this.router.navigateByUrl('/login');
  }

  getUsers() {
    const url = `${base_url}/users`;

    return this.http.get<User>(url, this.headers).pipe(
      map((res: any) => {
        const users = res.users.map((user) => ({
          name: user.name,
          email: user.email,
          password: '',
          birthDate: user.birthDate,
          img: user.img,
          role: user.role,
          uid: user.uid,
          assignedTeam: user.assignedTeam,
          createdAt: convertDate(user.createdAt),
        }));
        return users;
      })
    );
  }

  // Lato Admin
  deleteUser(uid: string) {
    const url = `${base_url}/users/${uid}`;
    return this.http.delete(url, this.headers);
  }

  // Lato Admin
  updateUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.put(url, user, this.headers);
  }
}
