import { Tournament } from './tournament';
import { Team } from './team';

export class Match {

  constructor(
    public _id: string,
    public homeTeam: Team,
    public awayTeam: Team,
    public tournament: Tournament,
    public round: number,
    public completed: boolean
  ) {}
}
