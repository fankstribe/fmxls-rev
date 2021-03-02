import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UserService } from '../services/user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private userService: UserService
  ) { }

  async updateImage(
    file: File,
    type: 'users' | 'teams' | 'tournaments',
    id: string
  ) {

    try {
      const url = `${base_url}/uploads/${type}/${id}`;

      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.userService.token
        },
        body: formData
      });

      const data = await res.json();

      // FIXME - Controllare messaggio errore backend
      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
