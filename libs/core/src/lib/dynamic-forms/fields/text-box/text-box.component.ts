import {ChangeDetectorRef, Component, Input, OnInit, Optional, Self} from '@angular/core';
import {AbstractFieldComponent} from "../AbstractFieldComponent";
import {FormField} from "../../../../../../base/src/lib/model/fields/FormField";
import {ErrorStateMatcherFactory} from "../../services/ErrorStateMatcherFactory";
import {MatFormFieldControl} from "@angular/material/form-field";

@Component({
  selector: 'satipasala-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: TextBoxComponent}],
})
export class TextBoxComponent extends AbstractFieldComponent<FormField<any>>{
  constructor(public errorStateMatcherFactory: ErrorStateMatcherFactory,public cdRef: ChangeDetectorRef) {
    super(errorStateMatcherFactory, cdRef)

  }
}
