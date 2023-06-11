import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { PermissionsService, RefDataType, ReferenceDataService, EventCategory } from "@satipasala/base";
import { ComponentType } from "@angular/cdk/portal";
import { RefDataTypeComponent } from "../../base";
import {DashboardTypeFormComponent} from "./event-category-form/dashboard-type-form.component";
import {DashboardType} from "../../../../../../../../../libs/base/src/lib/model/referencedata/DashboardType";

@Component({
    selector: 'admin-dashboard-type',
    templateUrl: './dashboard-type.component.html',
    styleUrls: ['./dashboard-type.component.css']
})
export class DahboardTypeComponent extends RefDataTypeComponent<DashboardType> {

    constructor(fireStore: AngularFirestore, dialog: MatDialog, referenceDataService: ReferenceDataService,
        public permissionsService: PermissionsService, cdr: ChangeDetectorRef) {
        super(RefDataType.DASHBOARD_TYPES, "Dashboard Types", fireStore, dialog, referenceDataService, permissionsService, cdr);
    }

    refDataFormMinWidth(): string {
        return "300px";
    }

    createNewObject(): DashboardType {
        return new DashboardType();
    }

    getComponentType(): ComponentType<any> {
        return DashboardTypeFormComponent;
    }

}
