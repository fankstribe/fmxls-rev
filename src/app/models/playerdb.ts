export class PlayerDB {

  constructor(
    public source: string,
    public countPlayers: string,
    public addedPlayers?: string,
    public modifiedPlayers?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

}
