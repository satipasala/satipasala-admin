import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RefDataFormObject, ReferenceDataFormDialog} from "../../../base";
import {QuestionType} from "@satipasala/base";
import {AnswerType, FormFieldType} from "../../../../../../../../../../libs/base/src/lib/model/Types";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'admin-question-type-form',
  templateUrl: './question-type-form.component.html',
  styleUrls: ['./question-type-form.component.css'],
})
export class QuestionTypeFormComponent extends ReferenceDataFormDialog<QuestionType, QuestionTypeFormComponent> {
  answerTypes = AnswerType;
  formFieldTypes = FormFieldType;

  constructor(public fb: FormBuilder, dialogRef: MatDialogRef<QuestionTypeFormComponent>, @Inject(MAT_DIALOG_DATA) formObject: RefDataFormObject<QuestionType>) {
    super(dialogRef);
    this.setDataObject(formObject)
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.dataObj.data.name || "", Validators.required],
      active: [this.dataObj.data.active || "Yes"],
      type: [this.dataObj.data.type ,Validators.required],
      label: [this.dataObj.data.label || ""],
      answerType: [this.dataObj.data.answerType ,Validators.required]
    });
  }



}

