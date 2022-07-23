import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/services/animations/route.animations';
import { UserService } from '../../../core/services/user.service';
import { FileUploadService } from '../../../core/services/file-upload.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { User } from '../../../models/user';

import { EditNameDialogComponent } from '../edit-name-dialog/edit-name-dialog.component';
import { EditEmailDialogComponent } from '../edit-email-dialog/edit-email-dialog.component';
import { EditBirthDateDialogComponent } from '../edit-birth-date-dialog/edit-birth-date-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  user: User;
  image: File;
  isHovering = false;
  isSmall: Observable<BreakpointState> = this.breakPointsObs.observe([
    Breakpoints.XSmall
  ]);

  constructor(
    private d: MatDialog,
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private breakPointsObs: BreakpointObserver,
    private snackBar: SnackBarService
  ) {
    this.user = userService.user;
   }

  ngOnInit(): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onEditName() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';
    dialogConfig.data = this.user

    const dialogRef = this.d.open(EditNameDialogComponent, dialogConfig);

    const smallDialog = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const name = res.user.name;
        this.user.name = name;

        this.snackBar.showSuccessSnackbar('Il tuo nome ora è modificato.');
      }
      smallDialog.unsubscribe();
    });

  }

  onEditEmail() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';
    dialogConfig.data = this.user

    const dialogRef = this.d.open(EditEmailDialogComponent, dialogConfig);

    const smallDialog = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const email = res.user.email;
        this.user.email = email;
        this.snackBar.showSuccessSnackbar('La tua email ora è modificata.');
      }
      smallDialog.unsubscribe();
    });
  }

  onEditBirthDate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';
    dialogConfig.data = this.user

    const dialogRef = this.d.open(EditBirthDateDialogComponent, dialogConfig);

    const smallDialog = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const birthDate = res.user.birthDate;
        this.user.birthDate = birthDate;
        this.snackBar.showSuccessSnackbar('La tua data di nascita ora è modificata.');
      }
      smallDialog.unsubscribe();
    });
  }

  onUploadImg(file: File) {
    this.fileUploadService.updateImage(file, 'users', this.user.uid)
      .then(img => {
        this.user.img = img
        this.snackBar.showSuccessSnackbar('La tua immagine ora è modificata.');
      }).catch(err => {
        // FIXME - non viene visualizzato il messaggio errore estensione
        // this.snackBar.showSuccessSnackbar('Questo file non è consentito.');
        console.log(err);
      });
  }

}
