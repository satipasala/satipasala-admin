import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PermissionsService, QuestionLabel, RefDataType, ReferenceDataService} from "@satipasala/base";
import {ComponentType} from "@angular/cdk/portal";
import {RefDataTypeComponent} from "../../base";
import {QuestionLabelFormComponent} from "./question-label-form/question-label-form.component";

@Component({
  selector: 'admin-question-labels',
  templateUrl: './questionlabels.component.html',
  styleUrls: ['./questionlabels.component.scss']
})
export class QuestionLabelsComponent extends RefDataTypeComponent<QuestionLabel> {

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.QUESTION_LABEL, "Question Labels", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): QuestionLabel {
    return <QuestionLabel>{};
  }

  getComponentType(): ComponentType<any> {
    return QuestionLabelFormComponent;
  }

}
