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
        name: 'Posizione',
        columnProp: 'position',
        options: [],
      },
      {
        name: 'Età',
        columnProp: 'age',
        options: [],
      },
      {
        name: 'Potenziale',
        columnProp: 'overall',
        options: [],
      },
      {
        name: 'Squadra',
        columnProp: 'team',
        options: [],
      },
      {
        name: 'Valore',
        columnProp: 'value',
        options: [],
      },
      {
        name: 'Stipendio',
        columnProp: 'wage',
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
      position: '',
      age: '',
      overall: '',
      team: '',
      value: '',
      wage: '',
    });
  }

  resetFilters() {
    this.filterDataForm.reset();
  }

  onSubmitForm() {
    const data = {
      position: this.filterDataForm.value.position,
      age: this.filterDataForm.value.age,
      overall: this.filterDataForm.value.overall,
      team: this.filterDataForm.value.team,
      value: this.filterDataForm.value.value,
      wage: this.filterDataForm.value.wage,
    };
    this.dialogRef.close(data);
  }
}
