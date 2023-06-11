import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FormField} from "../../../../../base/src/lib/model/fields/FormField";

@Component({
  selector: 's-field-error',
  templateUrl: './s-field-error.component.html',
  styleUrls: ['./s-field-error.component.scss']
})
export class SFieldError implements OnInit {
  get formControl(): FormControl {
    return this._formControl;
  }
  @Input()
  set formControl(value: FormControl) {
    this._formControl = value;
  }
  @Input() field:FormField<any>;
  private _formControl: FormControl;
  constructor() { }

  ngOnInit() {
  }

}
