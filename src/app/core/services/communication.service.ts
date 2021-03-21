import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private emitChangeSource = new Subject<any>();

  constructor() {}

  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(value: any) {
    this.emitChangeSource.next(value);
  }
}
