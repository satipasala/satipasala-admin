import {AfterViewChecked, ChangeDetectorRef, Input, OnInit, Directive} from "@angular/core";

import {FormControl, FormGroup, Validator} from "@angular/forms";
import {FormField} from "../../../../../base/src/lib/model/fields/FormField";
import {ErrorStateMatcherFactory} from "../services/ErrorStateMatcherFactory";

@Directive()
export class AbstractFieldComponent<T extends FormField<any>> implements OnInit, AfterViewChecked {

  @Input() showLabel = true;

  get field(): T {
    return this._field;
  }

  @Input()
  set field(value: T) {
    this._field = value;
  }

  private _field: T;

  private _form: FormGroup;
  get form(): FormGroup {
    return this._form;
  }

  @Input()
  set form(value: FormGroup) {
    this._form = value;
  }

  matcher: any;

  constructor(public errorStateMatcherFactory: ErrorStateMatcherFactory, public cdRef: ChangeDetectorRef) {
    this.matcher = this.errorStateMatcherFactory.getErrorStateMatcher('errorStateMatcher');
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  get isValid() {
    return this._form.controls[this._field.id].valid;
  }

  get isDirty() {
    return this._form.controls[this._field.id].dirty;
  }

  setControlValue(value: any) {
    this.field.value = value;
    this._form.controls[this._field.id].setValue(value);
  }
}
