import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../core/services/user.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-edit-email-dialog',
  templateUrl: './edit-email-dialog.component.html',
  styleUrls: ['./edit-email-dialog.component.scss']
})
export class EditEmailDialogComponent implements OnInit {
  emailForm: UntypedFormGroup;
  getEmail: string;
  formError = {
    email: ''
  };

  validationMessages = {
    email: {
      required: "La mail è obbligatoria.",
      pattern: 'Inserisci una mail valida.',
    }
  };
  constructor(
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private snackBar: SnackBarService,
    private dialogRef: MatDialogRef<EditEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.getEmail = data.email;
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.emailForm = this.formBuilder.group({
      email: [this.getEmail,
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          ),
        ]
      ]
    });
    this.emailForm.valueChanges.subscribe(data => {
      this.onValueChanged(data)});
  }

  onValueChanged(data?: any) {
    if (!this.emailForm) {
      return;
    }

    const form = this.emailForm;

    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmitForm() {
    this.userService.updateEmail(this.emailForm.value).subscribe((data) => {
      this.dialogRef.close(data);
    }, err => {
      this.dialogRef.close(false);
    });
  }

}
