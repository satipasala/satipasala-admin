import {ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {LanguageFormComponent,} from "./language-form/language-form.component";
import {Language, PermissionsService, RefDataType, ReferenceDataService} from "@satipasala/base";
import {ComponentType} from "@angular/cdk/portal";
import {RefDataTypeComponent} from "../../base";

@Component({
  selector: 'admin-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent extends RefDataTypeComponent<Language> {

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.LANGUAGE, "Languages", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): Language {
    return new Language();
  }

  getComponentType(): ComponentType<any> {
    return LanguageFormComponent;
  }

}
