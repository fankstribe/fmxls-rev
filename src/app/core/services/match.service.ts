import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Match } from '../../models/match';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MatchService {
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

  getMatch(_id: string) {
    const url = `${base_url}/matches/${_id}`;

    return this.http
      .get<Match>(url, this.headers)
      .pipe(map((res:any) => res.match));
  }

}
