import { Match } from './match';
import { Team } from './team';

export class Tournament {

  constructor(
    public tournamentName: string,
    public _id: number,
    public img: string,
    public status: boolean,
    public format: string,
    public teams: Team,
    public matches: Match,
    public createdAt: Date,
  ) {}
}
