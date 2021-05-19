import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

import { SnackBarService } from '../services/snackbar.service';

import {environment} from '../../../environments/environment';
import {Player} from '../../models/player';
import {PlayerDB} from '../../models/playerdb';

const base_url = environment.base_url;

@Injectable({providedIn: 'root'})
export class PlayerService {
 playersDB : PlayerDB;
 private cache: any;

 constructor(
   private http : HttpClient,
 ) {}

 get token(): string {
  return localStorage.getItem('token') || '';
 }

 get headers() {
  return {
   headers: {
    'x-token': this.token,
    observe: 'response'
   }
  };
 }

 // Lato Admin
 createPlayersDB(source : string) {
  const url = `${base_url}/playersdbs`;
  return this.http.post(url, {
   source
  }, this.headers)

 }

 // Lato Admin
 getPlayersDB() {
  const url = `${base_url}/playersdbs`;
  return this.http.get<PlayerDB>(url, this.headers).pipe(map((res : any) => res.playersDB));
 }

 // Lato Admin
 updatePlayersDB(source : string) {
  if (this.cache) {
    return of(this.cache);
  }
  const url = `${base_url}/playersdbs/${source}`;
  return this.http.put(url, {}, this.headers);
 }

 // Lato Admin
 deletePlayersDB(source : string) {
  const url = `${base_url}/playersdbs/${source}`;
  return this.http.delete(url, this.headers);
 }

 getPlayers() {
  const url = `${base_url}/players`;
  return this.http.get<Player>(url, this.headers).pipe(map((res : any) => res.players));
 }

  // Lato Admin
  deletePlayer(_id: string) {
  const url = `${base_url}/players/${_id}`;
  return this.http.delete(url, this.headers);
}
}
