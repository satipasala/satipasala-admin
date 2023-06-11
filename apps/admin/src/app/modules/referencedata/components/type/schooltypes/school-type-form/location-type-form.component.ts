import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {LocationType, OrganizationType, RefDataType, ReferenceDataService} from "@satipasala/base";
import {Observable} from "rxjs";

@Component({
  selector: 'admin-location-type-form',
  templateUrl: './location-type-form.component.html',
  styleUrls: ['./location-type-form.component.css']
})
export class LocationTypeFormComponent extends ReferenceDataFormDialog<LocationType, LocationTypeFormComponent> {

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<LocationTypeFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<LocationType>,private referenceDataService: ReferenceDataService) {
    super(dialogRef);
    this.setDataObject(formObject)
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.dataObj.data.name || "", Validators.required],
      active: [this.dataObj.data.active || "Yes"],
      displayName:[this.dataObj.data.displayName || "", Validators.required],
    });
  }

}

