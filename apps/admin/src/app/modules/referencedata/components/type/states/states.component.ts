import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PermissionsService, RefDataType, ReferenceDataService, State} from "@satipasala/base";
import {ComponentType} from "@angular/cdk/portal";
import {RefDataTypeComponent} from "../../base";
import {StateFormComponent} from "./states-form/state-form.component";

@Component({
  selector: 'admin-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent extends RefDataTypeComponent<State> {

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService,cdr: ChangeDetectorRef) {
    super(RefDataType.STATE, "States/Provinces", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): State {
    return new State();
  }

  getComponentType(): ComponentType<any> {
    return StateFormComponent;
  }

}
