import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {LocationType, OrganizationType} from "@satipasala/base";

@Component({
  selector: 'admin-organization-type-form',
  templateUrl: './organization-type-form.component.html',
  styleUrls: ['./organization-type-form.component.css']
})
export class OrganizationTypeFormComponent extends ReferenceDataFormDialog<OrganizationType, OrganizationTypeFormComponent> {

  locations: LocationType[];
  newItem: LocationType = this.createLocationType();


  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<OrganizationTypeFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<OrganizationType>) {
    super(dialogRef);
    this.setDataObject(formObject)
    this.locations = formObject.data.locations || [];

  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.dataObj.data.name || "", Validators.required],
      active: [this.dataObj.data.active || "Yes"],
      description: [this.dataObj.data.description || ""],
      locations: [this.locations || []]
    });
  }

  addNewItem(newItem: LocationType) {
    console.log(newItem);
    if (this.validateItem(newItem)) {
      this.locations.push(newItem);
      this.newItem = this.createLocationType();
    }
  }

  onSave(): void {
    if (this.formGroup.valid) {
      const x = this.formGroup.getRawValue();
      x.locations = x.locations.map((obj) => Object.assign({}, obj));
      this.dialogRef.close(x);
    } else {
      alert("Errors found! Please check and try again. ")
    }
  }


  deleteItem(location: LocationType) {
    console.log(this.locations.indexOf(location))
    this.locations.splice(this.locations.indexOf(location), 1);
  }

  validateItem(newItem: LocationType) {
    return !(this.locations.filter(e => e.name === newItem.name || e.displayName === newItem.displayName).length > 0 ||
      newItem === null ||
      newItem === undefined ||
      newItem.displayName === undefined ||
      newItem.name === undefined
    );
  }

  createLocationType(): LocationType {
    return new class implements LocationType {
      active: string;
      displayName: string;
      name: string;
    };
  }
}

