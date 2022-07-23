import { SocketService } from './core/services/socket.service';
import { Component, OnInit } from '@angular/core';

import { AppService } from './core/services/app.service';
import { SnackBarService } from './core/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spinnerName = 'page-spinner';

  constructor(
    private appService: AppService,
    private socketService: SocketService,
    private snackBar: SnackBarService,
  ) {

  }

  ngOnInit() {
    this.appService.trackingRouteEvent();
    this.getCreateDatabaseEvent();
    this.getUpdateDatabaseEvent();
    this.socketService.onEvent('connect')
      .subscribe(() => {
        console.log('Connesso a socket')
      })

    this.socketService.onEvent('disconnect')
      .subscribe(() => {
        console.log('Disconnesso da socket')
        localStorage.setItem('createStatus', 'false');
        localStorage.setItem('updateStatus', 'false');
      })
  }

  getCreateDatabaseEvent() {
    this.socketService.getEvent('database-created')
      .subscribe((res: any) => {
        if (res.data === 'error') {
          this.snackBar.showErrorSnackbar('Qualcosa è andato storto, riprova!');
          localStorage.setItem('createStatus', 'false')
        } else {
          this.snackBar.showSuccessSnackbar(`Database ${res.data[0].source} creato.`);
          localStorage.setItem('createStatus', 'false')
        }
      })
  }

  getUpdateDatabaseEvent() {
    this.socketService.getEvent('database-updated')
    .subscribe((res: any) => {
      if (res.data === 'error') {
        this.snackBar.showErrorSnackbar('Qualcosa è andato storto, riprova!');
        localStorage.setItem('updateStatus', 'false')
      } else {
        this.snackBar.showSuccessSnackbar('Database Aggiornato.');
        localStorage.setItem('updateStatus', 'false')
      }
    })
  }
}
