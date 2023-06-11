import {Directive, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {RefData} from "../../../../../../../../libs/base/src/lib/model/referencedata/RefData";

@Directive()
export abstract class ReferenceDataFormDialog<T, C> implements OnInit {
  public formGroup: FormGroup;
  dataObj: RefDataFormObject<T>;
  protected constructor(public dialogRef: MatDialogRef<C>) {
    dialogRef.afterClosed().subscribe(observer => this.onClose());
  }

  setDataObject(dataObj: RefDataFormObject<T>){
    this.dataObj = dataObj;
    this.formGroup = this.getFormGroup();
    this.formGroup.patchValue(dataObj)

    // Disable key field for edit mode
    if (dataObj.type === ViewType.EDIT) {
      this.formGroup.controls['name'].disable();
    }

    // Disable form for view mode
    if (this.dataObj.type === ViewType.VIEW) {
      this.formGroup.disable();
    }

    this.afterInit();
  }

  ngOnInit(): void {

  }

  onSave(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.getRawValue());
    } else {
      alert("Errors found! Please check and try again. ")
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  abstract getFormGroup(): FormGroup;

  afterInit(): void {
  }

  onClose(): void{
  }

  compareItems(i1: RefData, i2: RefData) {
    return i1 && i2 && i1.name === i2.name;
  }

}

export class RefDataFormObject<T> {
  public type: ViewType;
  public data: T;

  constructor(type: ViewType, data: T) {
    this.type = type;
    this.data = data;
  }
}

export enum ViewType {
  CREATE = "create",
  VIEW = "view",
  EDIT = "edit",
  DELETE = "delete"
}
