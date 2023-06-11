import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {EventCategory} from "@satipasala/base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DashboardType} from "../../../../../../../../../../libs/base/src/lib/model/referencedata/DashboardType";

@Component({
  selector: 'admin-dashboard-type-form',
  templateUrl: './dashboard-type-form.component.html',
  styleUrls: ['./dashboard-type-form.component.css']
})
export class DashboardTypeFormComponent extends ReferenceDataFormDialog<DashboardType, DashboardTypeFormComponent> {

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<DashboardTypeFormComponent>, @Inject(MAT_DIALOG_DATA) dataObj: RefDataFormObject<EventCategory>) {
    super(dialogRef);
    this.setDataObject(dataObj)
  }

  getFormGroup(): FormGroup {

    let formGroup: FormGroup = this.fb.group({
      name: [this.dataObj.data.name || "", Validators.required],
      active: [this.dataObj.data.active || "Yes"],
      dashboards: this.fb.array([]),
    });
    this.formGroup = formGroup;
    if (this.dataObj.data['dashboards']) {
      this.dataObj.data.dashboards.forEach((item) => {
        this.addItem(item);
      })
    }

    return formGroup
  }


  onNameChange(value: any) {
    this.formGroup.controls['id'].setValue(value.toUpperCase());
  }

  getLinksFormArray() {
    return (this.formGroup.get('dashboards') as FormArray).controls
  }

  addItem(item?:any) {
    const dashboards = this.formGroup.controls.dashboards as FormArray;
    dashboards.push(this.fb.group({
      name: [item?.name, Validators.required],
      link: [item?.link, Validators.required],
    }));
  }
}

