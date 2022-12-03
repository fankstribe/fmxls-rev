import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  filterDataForm: UntypedFormGroup;
  filterSelectObj = [];
  filterToUpdate = [];
  filterValue = {};

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.filterToUpdate = data.data;

    this.filterSelectObj = [
      {
        name: 'Email',
        columnProp: 'email',
        options: [],
      },
      {
        name: 'Ruolo',
        columnProp: 'role',
        options: [],
      },
      {
        name: 'Data Creazione',
        columnProp: 'createdAt',
        options: [],
      },
    ];
  }

  ngOnInit() {
    this.createFilter();
    this.filterSelect();
  }

  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key]) && obj[key] !== undefined) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  filterSelect() {
    const d = this.filterToUpdate;
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(d, o.columnProp);
    });
  }

  createFilter() {
    this.filterDataForm = this.formBuilder.group({
      email: '',
      role: '',
      createdAt: '',
    });
  }

  resetFilters() {
    this.filterDataForm.reset();
  }

  onSubmitForm() {
    const data = {
      email: this.filterDataForm.value.email,
      role: this.filterDataForm.value.role,
      createdAt: this.filterDataForm.value.createdAt,
    };
    this.dialogRef.close(data);
  }
}
