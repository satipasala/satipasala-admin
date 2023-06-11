import {ChangeDetectorRef, Component} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {City, PermissionsService, RefDataType, ReferenceDataService} from "@satipasala/base";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";
import {RefDataTypeComponent} from "../../base";
import {CityFormComponent} from "./city-form/city-form.component";

@Component({
  selector: 'admin-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent extends RefDataTypeComponent<City> {

  constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
              public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
    super(RefDataType.CITY, "Cities", fireStore, dialog, referenceDataService, permissionsService, cdr);
  }

  refDataFormMinWidth(): string {
    return "300px";
  }

  createNewObject(): City {
    return new City();
  }

  getComponentType(): ComponentType<any> {
    return CityFormComponent;
  }

}
