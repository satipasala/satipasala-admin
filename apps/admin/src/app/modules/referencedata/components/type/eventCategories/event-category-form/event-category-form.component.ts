import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RefDataFormObject, ReferenceDataFormDialog } from "../../../base";
import { EventCategory } from "@satipasala/base";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'admin-event-category-form',
  templateUrl: './event-category-form.component.html',
  styleUrls: ['./event-category-form.component.css']
})
export class EventCategoryFormComponent extends ReferenceDataFormDialog<EventCategory, EventCategoryFormComponent> {

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<EventCategoryFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<EventCategory>) {
    super(dialogRef);
    this.setDataObject(formObject)
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.dataObj.data.name || "", Validators.required],
      active: [this.dataObj.data.active || "Yes"],
      description: [this.dataObj.data.description || ""]
    });
  }



  onNameChange(value: any) {
    this.formGroup.controls['id'].setValue(value.toUpperCase());
  }
}

