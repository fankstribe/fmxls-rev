import { User } from './user';

export class Team {

  constructor(
    public teamName: string,
    public _id?: string,
    public img?: string,
    public createdAt?: Date,
    public user?: User
  ) {}
}
