import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {Language} from "@satipasala/base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as uuid from 'uuid'

@Component({
  selector: 'admin-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css']
})
export class LanguageFormComponent extends ReferenceDataFormDialog<Language, LanguageFormComponent> {

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<LanguageFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<Language>) {
    super(dialogRef);
    this.setDataObject(formObject)
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.dataObj.data.name || "", Validators.required],
      native: [this.dataObj.data.native || ""],
      shortName: [this.dataObj.data.shortName || ""],
      active: [this.dataObj.data.active || "Yes"],
      description: [this.dataObj.data.description || ""]
    });
  }

}

