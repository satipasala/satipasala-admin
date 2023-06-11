import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, Optional, Self} from '@angular/core';
import {ErrorStateMatcherFactory} from "../../services/ErrorStateMatcherFactory";
import {AbstractFieldComponent} from "../AbstractFieldComponent";
import {FormField} from "../../../../../../base/src/lib/model/fields/FormField";

@Component({
  selector: 'satipasala-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent  extends AbstractFieldComponent<FormField<boolean>>{

  constructor(public errorStateMatcherFactory: ErrorStateMatcherFactory,public cdRef: ChangeDetectorRef) {
   super(errorStateMatcherFactory, cdRef)

  }
}

