import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ErrorStateMatcherFactory} from "../../services/ErrorStateMatcherFactory";
import {AbstractFieldComponent} from "../AbstractFieldComponent";
import {FormField} from "../../../../../../base/src/lib/model/fields/FormField";

@Component({
  selector: 'satipasala-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends AbstractFieldComponent<FormField<any>>{

  constructor(public errorStateMatcherFactory: ErrorStateMatcherFactory,public cdRef: ChangeDetectorRef) {
    super(errorStateMatcherFactory, cdRef)

  }
}
