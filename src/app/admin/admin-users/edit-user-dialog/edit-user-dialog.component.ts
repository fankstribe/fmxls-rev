import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user';
import { SnackBarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  editUserForm: UntypedFormGroup;
  userToUpdate: User;

  formError = {
    name: '',
    email: ''
  };

  validationMessages = {
    name: {
      required: 'Il nome è obbligatorio.',
      minlength: 'Il nome deve avere almeno 3 caratteri.',
      maxlength: 'Il nome non può superare i 25 caratteri',
    },
    email: {
      required: "La mail è obbligatoria.",
      pattern: 'Inserisci una mail valida.',
    }
  }

  constructor(
    private userService: UserService,
    private snackBar: SnackBarService,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.userToUpdate = data.data;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editUserForm = this.formBuilder.group({
      email: [this.userToUpdate.email,
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
        ]
      ],
      name: [this.userToUpdate.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]
      ]
    });
    this.editUserForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.editUserForm) {
      return;
    }

    const form = this.editUserForm;

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

    const data: User = {
      uid: this.userToUpdate.uid,
      name: this.editUserForm.value.name,
      email: this.editUserForm.value.email,
      imageUrl: this.userToUpdate.imageUrl,
      role: this.userToUpdate.role
    }
    this.userService.updateUser(data).subscribe((data) => {
      this.dialogRef.close(data);
    }, err => {
      this.dialogRef.close(false);
    });
  }
}
