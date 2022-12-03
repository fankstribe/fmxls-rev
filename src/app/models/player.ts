import { Team } from './team';

export class Player {
  constructor(
    public playerName: string,
    public _id?: number,
    public img?: string,
    public age?: number,
    public position?: string,
    public overall?: number,
    public value?: string,
    public wage?: string,
    public source?: string,
    public team?: Team
  ) {}
}
