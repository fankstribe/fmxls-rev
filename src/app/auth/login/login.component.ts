import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { UserService } from '../../core/services/user.service';
import { SnackBarService } from '../../core/services/snackbar.service';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/services/animations/route.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  loginForm: UntypedFormGroup;

  formError = {
    email: '',
    password: '',
  };

  validationMessages = {
    email: {
      required: 'Inserisci una email valida.',
    },
    password: {
      required: 'Inserisci la password di registrazione.',
    },
  };

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }

    const form = this.loginForm;

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
    this.userService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
