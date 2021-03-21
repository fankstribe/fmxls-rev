import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManagerService } from '../../../core/services/manager.service';
import { TeamService } from '../../../core/services/team.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Manager } from '../../../models/manager';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-edit-manager-dialog',
  templateUrl: './edit-manager-dialog.component.html',
  styleUrls: ['./edit-manager-dialog.component.scss']
})
export class EditManagerDialogComponent implements OnInit {
  editManagerForm: FormGroup;

  managerToUpdate: any = Manager;
  selectedTeams: Team[];

  formError = {
    teamName: ''
  };

  validationMessages = {
    teamName: {
      required: 'Seleziona una squadra.',
    }
  };

  constructor(
    private managerService: ManagerService,
    private teamService: TeamService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.managerToUpdate = data.data;
  }

  ngOnInit() {
    this.createForm();

    this.teamService.getTeams().subscribe(data => {
      let arrayTeam = [];
      const team = data.filter(team => team._id === this.managerToUpdate.teamId)
      arrayTeam = data.filter(team => !team.user);
      arrayTeam.push(...team);
      this.selectedTeams = arrayTeam;
    })
  }

  createForm() {
    this.editManagerForm = this.formBuilder.group({
      teamName: [this.managerToUpdate.teamId, [Validators.required]]
    });
    this.editManagerForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  compareSelectedObj(obj1: number, obj2: number): boolean {
    return obj1 === obj2;
  }

  onValueChanged(data?: any) {
    if (!this.editManagerForm) {
      return;
    }

    const form = this.editManagerForm;

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
    this.managerService.updateManager(this.managerToUpdate._id, this.editManagerForm.value.teamName).subscribe((res) => {
      this.dialogRef.close(res);
    }, err => {
      this.dialogRef.close(false);
    });
  }
}
