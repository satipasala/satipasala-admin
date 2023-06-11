import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractFieldComponent} from "../AbstractFieldComponent";
import {FormField} from "../../../../../../base/src/lib/model/fields/FormField";
import {ErrorStateMatcherFactory} from "../../services/ErrorStateMatcherFactory";

@Component({
  selector: 's-selection-list',
  templateUrl: './s-selection-list.component.html',
  styleUrls: ['./s-selection-list.component.scss']
})
export class SSelectionListComponent extends AbstractFieldComponent<FormField<any>>{

  constructor(public errorStateMatcherFactory: ErrorStateMatcherFactory,public cdRef: ChangeDetectorRef) {
    super(errorStateMatcherFactory, cdRef)

  }
}
