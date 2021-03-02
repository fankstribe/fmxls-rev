import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Manager } from '../../models/manager';
import { map } from 'rxjs/operators';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getManagers() {
    const url = `${base_url}/managers`;

    return this.http.get<Manager>(url, this.headers)
      .pipe(
        map((res:any) => {
          const managers = res.managers.map(manager => ({
            _id: manager._id,
            user: manager.user.name,
            team: manager.team.teamName,
            createdAt: manager.createdAt
          }))
          return managers;
        })
      );
  }

  // Carica il manager dell'utente loggato
  getMyManager() {
    const userId = this.userService.uid
    const url = `${base_url}/managers/${userId}`;

    return this.http.get<Manager>(url, this.headers)
      .pipe(
        map((res:any) => res.manager)
    );
  }

  // Lato Admin
  createManager(data: {user: string, team: string}) {
    const url = `${base_url}/managers`;

    return this.http.post(url, { ...data }, this.headers);
  }

  // Lato Admin
  updateManager(_id: string, team: string) {
    const url = `${base_url}/managers/${_id}`;
    return this.http.put(url, { team }, this.headers);
  }

   // Lato Admin
   deleteManager(_id: string) {
    const url = `${base_url}/managers/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
