import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public birthDate?: Date,
    public img?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string,
    public assignedTeam?: boolean,
    public createdAt?: Date
  ) {}

  get imageUrl() {
    if (!this.img) {
      return `${base_url}/uploads/users/no-photo`;
    } else if (this.img) {
      return `${base_url}/uploads/users/${this.img}`;
    } else {
      return `${base_url}/uploads/users/no-photo`;
    }
  }
}
