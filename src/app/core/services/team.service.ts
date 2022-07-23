import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Team } from './../../models/team';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

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

  getTeams() {
    const url = `${base_url}/teams`;

    return this.http.get<Team>(url, this.headers)
      .pipe(
        map((res: any) => {
          const teams = res.teams.map(team => ({
              _id: team._id,
              img: team.img,
              teamName: team.teamName,
              user: team.user?.name,
              createdAt: team.createdAt
          }))
          return teams;
        })
      );
  }

  // Lato Admin
  createTeam(teamName: string) {
    const url = `${base_url}/teams`;

    return this.http.post(url, { teamName }, this.headers);
  }

   // Lato Admin
  updateTeam(team: Team) {
    const url = `${base_url}/teams/${team._id}`;
    return this.http.put<any>(url, team, this.headers)
    .pipe(
      map((res) => {

        const data = {
          _id: res.team._id,
          img: res.team.img,
          teamName: res.team.teamName,
          user: res.team.user.name,
          createdAt: res.team.createdAt
        }
        return data;
      })
    );
  }

  // Lato Admin
  deleteTeam(_id: number) {
    const url = `${base_url}/teams/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
