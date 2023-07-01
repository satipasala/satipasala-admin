import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {QuestionLabel} from "@satipasala/base";
import { v4 as uuidv4 } from 'uuid';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'admin-question-label-form',
  templateUrl: './question-label-form.component.html',
  styleUrls: ['./question-label-form.component.css'],
})
export class QuestionLabelFormComponent extends ReferenceDataFormDialog<QuestionLabel, QuestionLabelFormComponent> {

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<QuestionLabelFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<QuestionLabel>) {
    super(dialogRef);
    this.setDataObject(formObject)
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.dataObj.data.name || uuidv4()],
      label: [this.dataObj.data.label || this.dataObj.data.name|| "", Validators.required],
      active: [this.dataObj.data.active || "Yes"],
      type: [this.dataObj.data.type, ""],
      category: [this.dataObj.data.category || ""]
    });
  }

}

