import { User } from './user';
import { Team } from './team';

export class Manager {

  constructor(
    public _id: string,
    public user: User,
    public team: Team,
    public createdAt?: Date
  ) {}
}
