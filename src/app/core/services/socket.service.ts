import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) {}

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendEvent(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  getEvent(event: string) {
    return this.socket.fromEvent(event);
  }

  removeListen(event: string) {
    return this.socket.removeListener(event);
  }

  onEvent(event: string): Observable<any> {
    return new Observable<string>(observer => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }

}
