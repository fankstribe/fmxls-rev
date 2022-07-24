import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { UserService } from './../../../core/services/user.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-edit-name-dialog',
  templateUrl: './edit-name-dialog.component.html',
  styleUrls: ['./edit-name-dialog.component.scss']
})
export class EditNameDialogComponent implements OnInit {
  nameForm: UntypedFormGroup;
  getName: string;
  formError = {
    name: ''
  };

  validationMessages = {
    name: {
      required: 'Il nome è obbligatorio.',
      minlength: 'Il nome deve avere almeno 5 caratteri.',
      maxlength: 'Il nome non può superare i 25 caratteri',
    }
  };

  constructor(
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private snackBar: SnackBarService,
    private dialogRef: MatDialogRef<EditNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.getName = data.name;
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.nameForm = this.formBuilder.group({
      name: [this.getName,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ]
      ]
    });
    this.nameForm.valueChanges.subscribe(data => {
      this.onValueChanged(data)});
  }

  onValueChanged(data?: any) {
    if (!this.nameForm) {
      return;
    }

    const form = this.nameForm;

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
    this.userService.updateName(this.nameForm.value).subscribe((data) => {
      this.dialogRef.close(data);
    }, err => {
      this.dialogRef.close(false);
    });

  }

}
