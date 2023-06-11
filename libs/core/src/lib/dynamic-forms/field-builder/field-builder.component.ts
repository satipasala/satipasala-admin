import {Component, ElementRef, Input, OnInit, Optional, Self} from '@angular/core';
import {AbstractMatFieldComponent} from "../fields/AbstractMatFieldComponent";
import {FormBuilder, FormGroup, NgControl} from "@angular/forms";
import {FocusMonitor} from "@angular/cdk/a11y";
import {MatFormFieldControl} from "@angular/material/form-field";

@Component({
  selector: 'satipasala-field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: FieldBuilderComponent}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class FieldBuilderComponent extends AbstractMatFieldComponent<any> {
  @Input() showLabel = true;
  constructor(formBuilder: FormBuilder,
              public _focusMonitor: FocusMonitor,
              public _elementRef: ElementRef<HTMLElement>,
              @Optional() @Self() public ngControl: NgControl) {
    super(formBuilder, _focusMonitor, _elementRef, ngControl);
  }

  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }


}
