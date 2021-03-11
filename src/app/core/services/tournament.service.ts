import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Tournament } from './../../models/tournament';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
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

  getTournaments() {
    const url = `${base_url}/tournaments`;

    return this.http
      .get<Tournament>(url, this.headers)
      .pipe(map((res: any) => res.tournaments));
  }

  getTournament(_id: string) {
    const url = `${base_url}/tournaments/${_id}`;

    return this.http
      .get<Tournament[]>(url, this.headers)
      .pipe(map((res: any) => res.tournament));
  }

  // Lato Admin
  createTournament(data: {
    tournamentName: string;
    teams: string;
    format: string;
  }) {
    const url = `${base_url}/tournaments`;

    return this.http.post(url, { ...data }, this.headers);
  }

  // Lato Admin
  updateTournament(_id: string, tournamentName: string) {
    const url = `${base_url}/tournaments/${_id}`;
    return this.http.put(url, { tournamentName }, this.headers);
  }

  // Lato Admin
  updateState(_id: string, completed: boolean) {
    const url = `${base_url}/tournaments/${_id}`;
    return this.http.put(url, { completed }, this.headers);
  }

  // Lato Admin
  deleteTournament(_id: string) {
    const url = `${base_url}/tournaments/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
