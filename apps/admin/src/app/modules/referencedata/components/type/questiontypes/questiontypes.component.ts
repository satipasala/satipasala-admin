import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PermissionsService, QuestionType, RefDataType, ReferenceDataService} from "@satipasala/base";
import {ComponentType} from "@angular/cdk/portal";
import {RefDataTypeComponent} from "../../base";
import {QuestionTypeFormComponent} from "./question-type-form/question-type-form.component";

@Component({
  selector: 'admin-question-types',
  templateUrl: './questiontypes.component.html',
  styleUrls: ['./questiontypes.component.css']
})
export class QuestionTypesComponent extends RefDataTypeComponent<QuestionType> {

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.QUESTION_TYPE, "Question Types", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): QuestionType {
    return <QuestionType>{};
  }

  getComponentType(): ComponentType<any> {
    return QuestionTypeFormComponent;
  }

}
