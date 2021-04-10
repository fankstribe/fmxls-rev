import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Player } from '../../models/player';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  // Lato Admin
  createPlayersDB(source: string) {
    const url = `${base_url}/playersdbs`;

    return this.http.post(url, { source }, this.headers)
  }

}
