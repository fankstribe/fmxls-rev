import { environment } from '../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

const base_url = environment.base_url;

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(img: string, type: 'users' | 'teams' | 'tournaments'): string {

    if (!img) {
      return `${base_url}/uploads/${type}/no-photo`;
    } else if (img) {
      return `${base_url}/uploads/${type}/${img}`;
    } else {
      return `${base_url}/uploads/${type}/no-photo`;
    }
  }
}
