import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManagerService } from '../../../core/services/manager.service';
import { UserService } from '../../../core/services/user.service';
import { TeamService } from '../../../core/services/team.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { User } from '../../../models/user';
import { Team } from '../../../models/team';


@Component({
  selector: 'app-add-manager-dialog',
  templateUrl: './add-manager-dialog.component.html',
  styleUrls: ['./add-manager-dialog.component.scss']
})
export class AddManagerDialogComponent implements OnInit {
  addManagerForm: FormGroup;

  selectedUsers: User[];
  selectedTeams: Team[];

  formError = {
    name: '',
    teamName: ''
  };

  validationMessages = {
    name: {
      required: 'Seleziona un utente.',
    },
    teamName: {
      required: 'Seleziona una squadra.',
    }
  };

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private managerService: ManagerService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddManagerDialogComponent>,
  ) {}

  ngOnInit() {
    this.createForm();

    this.userService.getUsers().subscribe(data => {
      this.selectedUsers = data.filter(user => !user.assignedTeam);
    });

    this.teamService.getTeams().subscribe(data => {
      this.selectedTeams = data.filter(team => !team.user);
    })
  }

  createForm() {
    this.addManagerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      teamName: ['', [Validators.required]]
    });
    this.addManagerForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.addManagerForm) {
      return;
    }

    const form = this.addManagerForm;

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
    const data = {
      user: this.addManagerForm.value.name,
      team: this.addManagerForm.value.teamName
    }

    this.managerService.createManager(data).subscribe((res) => {
      this.dialogRef.close(res);
    }, err => {
      this.dialogRef.close(false);
    });
  }
}
