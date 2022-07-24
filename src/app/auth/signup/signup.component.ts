
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/services/animations/route.animations';
import { UserService } from '../../core/services/user.service';
import { SnackBarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  signupForm: UntypedFormGroup;

  hide = true;

  validDate = new Date(new Date().setFullYear(new Date().getFullYear() - 16));

  formError = {
    name: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
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
    },
    birthDate: {
      required: 'La data di nascita è obbligatoria.'
    },
    password: {
      required: '',
      pattern: 'La password deve avere almeno un numero e un carattere.',
      minlength: 'La password deve avere almeno 6 caratteri.',
      maxlength: 'La password non può superare i 25 caratteri.',
    },
    confirmPassword: {
      required: '',
      mustMatch: 'La password non coincide.',
    },
  };

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private snackBar: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(25),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
            ),
          ],
        ],
        birthDate: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            Validators.minLength(6),
            Validators.maxLength(25),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );

    this.signupForm.valueChanges.subscribe((data) => this.onValueChanged(data));
  }

  mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) {
      return;
    }

    const form = this.signupForm;

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

    console.log(this.signupForm.value);
    this.userService.createUser(this.signupForm.value).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
