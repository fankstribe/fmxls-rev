import { Match } from './match';
import { Team } from './team';

export class Tournament {

  constructor(
    public tournamentName: string,
    public _id: string,
    public img: string,
    public completed: boolean,
    public format: string,
    public teams: Team,
    public matches: Match,
    public createdAt: Date,
  ) {}
}
